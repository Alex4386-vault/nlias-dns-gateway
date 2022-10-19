# NLIAS DNS Gateway
자국어 인터넷 주소 체계 (NLIAS) 를 지원하는 DNS 서버  

<img width="1003" alt="image" src="https://user-images.githubusercontent.com/27724108/196781222-df38cdc9-4978-49d3-b4d2-b46f36e89f33.png">

## 이런걸 왜 짜냐?
<img width="469" alt="image" src="https://user-images.githubusercontent.com/27724108/196758664-2038195b-9e03-4891-9f9a-98575bff8093.png">

넷피아 아저씨. 이 정도면 됐죠?

## 아니 자국어 인터넷 주소 체계(NLIAS) 가 뭔데?
그냥 XP 쓰던 시절에 IE6 에 쓰다가 주소 잘못치면 광고 뜨던거 기억나시나요? 이게 그겁니다.  

이래도 모르겠는 민잼들을 위해 설명해 주자면:  
NLIAS (Native Language Internet Address System, 자국어 인터넷 주소 체계) [IETF Draft](https://datatracker.ietf.org/doc/html/draft-pjlee-nlias-01) 는 비영어권 국가를 위한 DNS 대체재... 정도 되겠습니다.

## 아니 DNS 잘 쓰고 있잖아 이딴걸 왜 대응해요?
어... 아닙니다!  
2000년대 초에 이거 브라우저에 이거 구현하는 게 의무화 되어있어서, NLIAS 기반 인터넷 주소를 사용하는 회사들이 좀 있었어요.    

저 의무화 때문에 Internet Explorer 6 에도 이게 구현이 되어있었고요.  
아직 몇몇 기업들이 한글도메인 중에서 NLIAS 에 만 의존하는 사이트들이 몇 몇곳 있긴 해서, 이걸 대응 하면 역방향 호환성 문제를 어느정도 해결할 수 있습니다.  

## 잠깐, 이거 NLIAS 가 직접 구현되어있는게 아니잖아... 사쿠라네~ 사쿠라여! 손목!
이게.... 구현을 직접 하려고 했는데, 넷피아 쪽에서 NLIAS 서버를 내려버렸어요...  
서버가 죽어서 넷피아 쪽에서 운영하고 있는 웹 Redirection (즉, 유사 Portal) 에다가 갖다 박아놨습니다.  

## License
[WTFPL](LICENSE)  
본 서버는 ICANN 의 TLD 및 도메인 가이드라인을 대놓고 무시하며, 님 네트워크를 아주 그냥 조져버릴 수 있습니다. **전 분명 경고했어요!**  
