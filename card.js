// 森藍 LINE 電子名片：設定 + Flex Message 產生器
// 改名片內容只要改 CONFIG；index.html（LIFF 分享頁）與 node build-flex.js 都讀這份。
(function (root) {
  const CONFIG = {
    liffId: "0000000000-XXXXXXXX",            // 待補：LINE Developers 建好 LIFF 後填入
    addFriendUrl: "https://line.me/ti/p/J-dgUsoi00",  // 老高個人 LINE
    photoUrl: "https://gao376.github.io/line-card/img/gao-hero.jpg", // 主圖 1040×1300
    name: "老高",
    title: "SEO・網站・AI 自動化顧問",
    company: "森藍數位行銷",
    tagline: "先研究，後設計，讓網站自己帶客人",
    phone: "0935-589-713",
    email: "gaoads@senlan.com.tw",
    website: "https://senlan.com.tw/",
    portfolio: "https://senlan.com.tw/",       // 作品集：目前先放官網
    services: [
      ["網站設計", "品牌官網・電商・Landing Page"],
      ["SEO 與內容", "關鍵字研究・AI 文案・成效報表"],
      ["整合廣告投放", "Google・Meta・YouTube"],
      ["AI 影音", "短影音・形象影片"],
      ["LINE 自動化", "機器人・表單・AI 課程"],
    ],
  };

  const C = {
    navy: "#0F2A55", blue: "#1A4B8C", bright: "#2F80ED", pale: "#F2F6FC",
    gray: "#5B6B82", white: "#FFFFFF",
  };

  function footer(cfg) {
    return {
      type: "box", layout: "vertical", spacing: "sm", paddingAll: "12px",
      contents: [
        { type: "button", style: "primary", color: C.blue, height: "md",
          action: { type: "uri", label: "+ 加 LINE 好友", uri: cfg.addFriendUrl } },
        { type: "button", style: "secondary", color: "#E3ECF9", height: "md",
          action: { type: "uri", label: "分享我的名片", uri: "https://liff.line.me/" + cfg.liffId } },
      ],
    };
  }

  function profileBubble(cfg) {
    return {
      type: "bubble", size: "mega",
      hero: { type: "image", url: cfg.photoUrl, size: "full", aspectRatio: "4:5", aspectMode: "cover",
              action: { type: "uri", label: "加好友", uri: cfg.addFriendUrl } },
      footer: footer(cfg),
    };
  }

  function servicesBubble(cfg) {
    return {
      type: "bubble", size: "mega",
      header: {
        type: "box", layout: "vertical", paddingAll: "20px",
        background: { type: "linearGradient", angle: "135deg", startColor: C.navy, endColor: C.bright },
        contents: [
          { type: "text", text: "SERVICES", size: "xs", color: "#9EC3FF", weight: "bold" },
          { type: "text", text: "我可以幫你做的事", size: "xl", color: C.white, weight: "bold", margin: "sm" },
        ],
      },
      body: {
        type: "box", layout: "vertical", paddingAll: "20px", spacing: "lg",
        contents: cfg.services.map(([t, d], i) => ({
          type: "box", layout: "horizontal", spacing: "md", contents: [
            { type: "box", layout: "vertical", width: "28px", height: "28px", cornerRadius: "14px",
              backgroundColor: C.pale, justifyContent: "center", alignItems: "center", flex: 0,
              contents: [{ type: "text", text: String(i + 1), size: "sm", color: C.blue, weight: "bold", align: "center" }] },
            { type: "box", layout: "vertical", contents: [
              { type: "text", text: t, size: "md", weight: "bold", color: C.navy },
              { type: "text", text: d, size: "xs", color: C.gray, wrap: true },
            ]},
          ],
        })),
      },
      footer: footer(cfg),
    };
  }

  function contactBubble(cfg) {
    const row = (label, value, uri) => ({
      type: "box", layout: "vertical", paddingAll: "12px", cornerRadius: "10px", backgroundColor: C.pale,
      action: { type: "uri", label: label, uri: uri },
      contents: [
        { type: "text", text: label, size: "xxs", color: C.gray },
        { type: "text", text: value, size: "md", color: C.navy, weight: "bold", wrap: true },
      ],
    });
    return {
      type: "bubble", size: "mega",
      header: {
        type: "box", layout: "vertical", paddingAll: "20px",
        background: { type: "linearGradient", angle: "135deg", startColor: C.navy, endColor: C.bright },
        contents: [
          { type: "text", text: "CONTACT", size: "xs", color: "#9EC3FF", weight: "bold" },
          { type: "text", text: "聯絡我", size: "xl", color: C.white, weight: "bold", margin: "sm" },
        ],
      },
      body: {
        type: "box", layout: "vertical", paddingAll: "20px", spacing: "md",
        contents: [
          row("電話（點一下撥打）", cfg.phone, "tel:" + cfg.phone.replace(/-/g, "")),
          row("Email", cfg.email, "mailto:" + cfg.email),
          row("官網", cfg.website.replace(/^https?:\/\//, "").replace(/\/$/, ""), cfg.website),
          row("作品集", "看我們做過的網站", cfg.portfolio),
        ],
      },
      footer: footer(cfg),
    };
  }

  function buildFlex(cfg = CONFIG) {
    return {
      type: "flex",
      altText: `${cfg.name}｜${cfg.company} 的電子名片`,
      contents: { type: "carousel", contents: [profileBubble(cfg), servicesBubble(cfg), contactBubble(cfg)] },
    };
  }

  const api = { CONFIG, buildFlex };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SenlanCard = api;
})(this);
