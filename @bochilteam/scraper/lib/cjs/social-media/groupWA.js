"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupWA = void 0;
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
async function groupWA(query) {
    const html = await (0, got_1.default)(`http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=${encodeURIComponent(query).replace(/%20/g, '+')}&searchby=name`).text();
    const $ = cheerio_1.default.load(html);
    const results = [];
    $('div.entry > div.wa-chat').each((_, el) => {
        const $el = $(el);
        const $a = $el.find('a');
        const url = $a.find('div.wa-chat-title-container > a').attr('href') ||
            $el.find('div.wa-chat-message > a.URLMessage').attr('href');
        const subject = $el.find('div.wa-chat-title-text').text().trim();
        if (url) {
            results.push({
                url,
                subject
            });
        }
    });
    return results;
}
exports.groupWA = groupWA;
//# sourceMappingURL=groupWA.js.map