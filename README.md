# NLIAS DNS Gateway
A DNS Server that supports NLIAS specs ([Korean](/README.ko.md))  

## What the heck is NLIAS?
If you have lived Korea while IE6 is mainstream, You might have experience making typo on address bar shows you an advert on Internet Explorer. This is the culprit of that.  

If you don't know, This is the explanation:  
NLIAS (Native Language Internet Address System) [IETF Draft](https://datatracker.ietf.org/doc/html/draft-pjlee-nlias-01) created by company called "[Netpia](http://netpia.com)" is an alternative of "DNS" for non-english speaking countries. It uses dotless "domain"

## I mean... This isn't adopted at all... right?
Wrong!  
Back in the days at 2000s, implementation of NLIAS is required by the law in South Korea.  

Therefore, in order to comply with the law, Microsoft introduced NLIAS support starting with Internet Explorer 6.  

Since nowdays, the browsers we use are now using does not support NLIAS, This "might" create problem with backwards compatibility.  

So, I present you, `nlias-dns-gateway`. A DNS Server that respects NLIAS Spec.

## License
[WTFPL](LICENSE)  
  
This software does NOT respect ICANN domain guidelines and can "pluck up" your network setup. **USE AT YOUR OWN RISK!**  
