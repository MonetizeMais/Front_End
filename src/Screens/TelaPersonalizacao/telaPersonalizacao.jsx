import React from 'react';
import '../TelaPersonalizacao/Telapersonalizacao.css';
import MenuBar from '../../components/MenuBar/MenuBar';

// Substituindo as imagens pelos links fornecidos
const logoPoupinho = 'https://lh3.googleusercontent.com/pw/AP1GczOvc6d0ZiIAHmbP5QMYbOlHTsxeRapLHJwzIqlNHJUEn9lFoplFYWlKTTSyGAEbkCP7YEhiDb-TDJ-cwZbmMrVyU5jTbMN-LU5eL15ySoIlvcvq0upBoRqtpyCV2OXvEocoXLdj9O3konWcio15dn0=w631-h617-s-no-gm?authuser=1'; 
const IconeChapeu1 = 'https://lh3.googleusercontent.com/pw/AP1GczPWV5ZupsR727NZkxJFhaCBUZtXxEocJtlqUAxfrCy1HoG61XnBIxQbm7_6fkag0IXcBGg_Ke1MzvkzN_QtwaQ279E5_DlQ5BSX2LJ3cyxE1wMHBXgYjhISWgsPR0Yx_iNewa-PLEzRShjt1qtxH5E=w631-h609-s-no-gm?authuser=1';
const IconeChapeu2 = 'https://lh3.googleusercontent.com/pw/AP1GczOunzmY6NTlIJs8-tY-eH1vznRJIFWyqYXE_mgxkvbkPuCy9pHc0QO7LQgmaG8bbI6tJjkoQ9yZQKIKYVrH9n-bUQeb431QqNeb8iKKpI2wZu-nLFmq-mCBOtARs5gGNaqU0TLm4W8tQRx8lcsvqM0=w631-h624-s-no-gm?authuser=1';
const IconeChapeu3 = 'https://lh3.googleusercontent.com/pw/AP1GczNVbQMQ6uf8WL2L3p4RQ5RDlqpiWydDG9lMItSEERJRSC3854pabaaxSH_gZgYqWI6yp10EMTBuZNFa8-xtb4ZITe-tcsPI4WeYZ-_2JKXxT5iWh61IHvxpWAzVcrU_553pV8fKTm16Hi8A64hg2dg=w631-h609-s-no-gm?authuser=1';
const IconeChapeu4 = 'https://lh3.googleusercontent.com/pw/AP1GczPJF4CB1UkzcEU16la2jnE0YYeKOo6sorO_Rx5e53ncFDhBWdNsa3oHucshCMo18ATEsNVCqft7W8wDcLEkZJklyEzPOPg4uKNWkTjnAw9SPtREIXwmWjaCxZxUNS7IEjdWQTMmEfu-_VnyG8Zggoc=w631-h609-s-no-gm?authuser=1';
const IconeChapeu5 = 'https://lh3.googleusercontent.com/pw/AP1GczMseCcmt0S_M3wAerek168oPGzxYxiq4VgZXn8ktPZWH2DoQzyu4SL-gIi1p5NpHThCDFdK5bHucFggbPFNZVTmQWRSCwr5pVfmpk_jS7OaVo-GEA4ubu-sE52mo_oJv6VlKh0ejW_gVOiCokHw928=w631-h609-s-no-gm?authuser=1';
const IconeChapeu6 = 'https://lh3.googleusercontent.com/pw/AP1GczNmN-PudjK1GZnXjs96VnZ1FN3rmMO2twNoaNirsRS7MhHyYjgzkuPs9r1hA-D7jwBgD2lzX205s3adigIyMGNKTPH3KoFCdrkY9gQz718I3zjXleYNBq6SrmrF9N4sKt_NINvIe-P2F8O97maCODA=w631-h609-s-no-gm?authuser=1';

function TelaPersonalizacao() {
  return (
    <div className="personalizacao-container">
      <div className="poupinho-section">
        <img 
          src={logoPoupinho} 
          alt="Poupinho" 
          className="poupinho-avatar"
        />
        <button className="btn-estilizar">
          Estilizar o Poupinho!
        </button>
      </div>

      <div className="itens-personalizacao">
        <div className="item-personalizacao">
          <img src={IconeChapeu1} alt="Chapéu 1" />
        </div>
        <div className="item-personalizacao">
          <img src={IconeChapeu2} alt="Chapéu 2" />
        </div>
        <div className="item-personalizacao">
          <img src={IconeChapeu3} alt="Chapéu 3" />
        </div>
        <div className="item-personalizacao">
          <img src={IconeChapeu4} alt="Chapéu 4" />
        </div>
        <div className="item-personalizacao">
          <img src={IconeChapeu5} alt="Chapéu 5" />
        </div>
        <div className="item-personalizacao">
          <img src={IconeChapeu6} alt="Chapéu 6" />
        </div>
      </div>

      <MenuBar />
    </div>
  );
}

export default TelaPersonalizacao;
