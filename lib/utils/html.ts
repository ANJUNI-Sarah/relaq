import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

interface SanitizeOptions {
    ALLOWED_TAGS?: string[];
    ALLOWED_ATTR?: string[];
    ALLOW_DATA_ATTR?: boolean;
}

const defaultOptions: SanitizeOptions = {
    ALLOWED_TAGS: [
        "p",
        "br",
        "strong",
        "em",
        "u",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "a",
        "img",
        "blockquote",
        "code",
        "pre",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class"],
    ALLOW_DATA_ATTR: false,
};

/**
 * 清理 HTML 內容，移除危險的標籤和屬性
 * @param html HTML 字符串
 * @param options 清理選項
 * @returns 清理後的 HTML 字符串
 */
export function sanitizeHtml(
    html: string,
    options: SanitizeOptions = {}
): string {
    const sanitizeOptions = {
        ...defaultOptions,
        ...options,
    };

    return DOMPurify.sanitize(html, sanitizeOptions);
}

/**
 * 檢查 HTML 是否包含危險內容
 * @param html HTML 字符串
 * @returns 是否安全
 */
export function isHtmlSafe(html: string): boolean {
    const sanitized = DOMPurify.sanitize(html);
    return sanitized === html;
}
