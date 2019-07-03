const i18next = require('i18next');

module.exports = (defaultLng, wl, locales) => {
  return (req, res, next) => {
    const browserLng = req.get('Accept-Language');
    let lng = browserLng ? browserLng.substr(0,2) : null;

    // ロケールにない言語コードの場合、デフォルトに置換
    if(!locales[lng]) {
      lng = defaultLng;
    }
    // TODO 言語更新が必要となったら
    // Promise<TFunction>
    // await req.i18next.changeLanguage("ko");

    i18next.init({
      lng: lng,
      whitelist: wl,
      resources: locales
    });

    req.i18next = i18next;
    next();
  };
};