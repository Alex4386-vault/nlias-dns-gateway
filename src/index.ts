// 안이 내가 이런걸 왜 짜고 있지?
import dns from 'dns';
import DNS2 from 'dns2';
import figlet from 'figlet';
import chalk from 'chalk';
import fs from 'fs';
import axios from 'axios';
import punycode from 'punycode/';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

console.log(figlet.textSync('NLIAS-DNS', 'Small Slant'));
console.log('DNS Server with ' + chalk.bold('NLIAS Support') + ' - ' + chalk.italic('ver. ' + packageJson.version));

async function handleNetpia(query: string) {
  // https://www.netpia.com/emon/gogogo.asp?nlia1=%B4%D9%C0%BD&com=nethome&nlia=%B4%D9%C0%BD&na_btn=
  // ->
  // https://www.coolup.ai/html/union.php?query={}
  //

  // wait.... This is just a shitty search engine!!!

  const data = await axios.request({
    method: 'GET',
    url: 'https://coolup.ai/html/union.php?query=' + encodeURIComponent(query),
    maxRedirects: 0,
    validateStatus: () => true,
    headers: {
      'User-Agent': 'NLIAS-DNS/1.0.0',
    },
  });

  console.log(chalk.magentaBright('!'), 'Handling NLIAS domain:', query);

  const coolupMatchFoundRegex = /<meta http-equiv=(?:"|')refresh(?:"|') content=(?:"|')0;(?:| )url=(.+)(?:"|')>/g;
  const result = coolupMatchFoundRegex.exec(data.data);

  if (result) {
    console.log(chalk.magentaBright('!'), 'Handled NLIAS domain:', query, '->', new URL(result[1]).hostname);
    return result[1];
  }

  console.log(chalk.redBright('X'), 'NLIAS domain:', query, 'not found');
}

const dnsClient = new DNS2();

const dnsServer = DNS2.createServer({
  udp: true,
  tcp: true,
  handle: async (req, send, rinfo) => {
    const resp = DNS2.Packet.createResponseFromRequest(req);
    const name = req.questions[0].name;

    if (name.indexOf('.') < 0) {
      if (name.indexOf('xn--') === 0) {
        const netpiaResult = await handleNetpia(punycode.toUnicode(name));
        if (netpiaResult) {
          resp.answers.push({
            type: DNS2.Packet.TYPE.CNAME,
            ttl: 60,
            domain: new URL(netpiaResult).hostname,
            name,
            class: DNS2.Packet.CLASS.IN,
          });
          return send(resp);
        }
      }
    }

    const queryV4 = await dnsClient.resolveA(name);
    for (const answer of queryV4.answers) {
      resp.answers.push({
        name: name,
        type: answer.type,
        class: answer.class,
        ttl: answer.ttl,
        address: answer.address,
      });
    }

    const queryV6 = await dnsClient.resolveA(name);
    for (const answer of queryV6.answers) {
      resp.answers.push({
        name: name,
        type: answer.type,
        class: answer.class,
        ttl: answer.ttl,
        address: answer.address,
      });
    }

    send(resp);
  },
});

dnsServer.on('request', (request, response, rinfo) => {
  let name = request.questions[0].name;
  if (name.indexOf('xn--') === 0) {
    name = punycode.toUnicode(request.questions[0].name);
  }
  console.log(chalk.yellowBright('!'), 'Got request for', name);
});

dnsServer.on('requestError', (error) => {
  console.log('Client sent an invalid request', error);
});

dnsServer.on('listening', () => {
  console.log(chalk.greenBright('V'), 'NLIAS-DNS is listening...');
});

dnsServer.listen({
  udp: 15353,
  tcp: 15353,
});
