import { useEffect, useRef } from 'react';

interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  breadcrumbs?: { name: string; url: string }[];
  /** 文章页结构化数据（NewsArticle JSON-LD） */
  article?: {
    title: string;
    description: string;
    publishDate: string;
    author: string;
    /** 站内相对路径或绝对 URL */
    image?: string;
    keywords?: string;
  };
}

const SITE_URL = 'https://tjb.petricw.com';
const BASE_TITLE = '成都市田家炳中学官网';
const BASE_DESC = '成都市田家炳中学官网（tjb.petricw.com）。始建于1925年，始称成城公学，百年名校。四川省一级示范性普通高中，全国国防教育示范校，教育部人工智能教育双试点单位。坐落于成都市锦江区顺江路369号，地铁6号线/13号线三官堂站A口直达。招生咨询电话：028-84551880。';
const BASE_KEYWORDS = '成都市田家炳中学官网,成都市田家炳中学,田家炳中学,成都田中,田家炳中学官网,四川省一级示范校,成都高中排名,锦江区中学,顺江路369号,百年名校,六年贯通培养,成城公学,国防教育示范校,人工智能教育';
const DEFAULT_OG_IMAGE = `${SITE_URL}/hero-bg.webp`;

/**
 * SEO Hook — 动态设置页面标题、描述、关键词、canonical URL、
 * Open Graph、百度SEO、JSON-LD 结构化数据
 */
export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  breadcrumbs,
  article,
}: SEOOptions = {}) {
  const prevCanonical = useRef<HTMLLinkElement | null>(null);
  const prevJsonLd = useRef<HTMLScriptElement[]>([]);

  useEffect(() => {
    const fullTitle = title ? `${title} — ${BASE_TITLE}` : `${BASE_TITLE} — 百年名校·四川省一级示范性普通高中`;
    const desc = description || BASE_DESC;
    const kw = keywords || BASE_KEYWORDS;
    const url = canonical || `${SITE_URL}${window.location.pathname}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    // ========== 基础 Meta ==========
    document.title = fullTitle;
    setMeta('description', desc);
    setMeta('keywords', kw);

    // ========== 百度SEO ==========
    setMeta('applicable-device', 'pc,mobile');
    setMeta('baiduspider', 'index, follow');

    // ========== Open Graph ==========
    setMeta('og:title', undefined, fullTitle, true);
    setMeta('og:description', undefined, desc, true);
    setMeta('og:url', undefined, url, true);
    setMeta('og:image', undefined, image, true);
    setMeta('og:type', undefined, ogType, true);
    setMeta('og:site_name', undefined, BASE_TITLE, true);
    setMeta('og:locale', undefined, 'zh_CN', true);

    // ========== Twitter Card ==========
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', image);

    // ========== Canonical URL ==========
    // 复用 index.html 的静态 canonical（SPA 路由切换只更新 href，避免出现两条）
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) {
      link.href = url;
      prevCanonical.current = null;
    } else {
      link = document.createElement('link');
      link.rel = 'canonical';
      link.href = url;
      document.head.appendChild(link);
      prevCanonical.current = link;
    }

    // ========== JSON-LD 结构化数据（面包屑 + 文章） ==========
    prevJsonLd.current.forEach((el) => el.remove());
    prevJsonLd.current = [];

    const jsonLdPayloads: object[] = [];

    if (breadcrumbs && breadcrumbs.length > 0) {
      jsonLdPayloads.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
        })),
      });
    }

    if (article) {
      const absImage = (p?: string) => (p ? (p.startsWith('http') ? p : `${SITE_URL}${p}`) : undefined);
      jsonLdPayloads.push({
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.description,
        datePublished: article.publishDate,
        dateModified: article.publishDate,
        author: { '@type': 'Organization', name: article.author, url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: '成都市田家炳中学',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.jpg` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        image: absImage(image),
        keywords: article.keywords || kw,
        inLanguage: 'zh-CN',
      });
    }

    for (const payload of jsonLdPayloads) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(payload);
      document.head.appendChild(script);
      prevJsonLd.current.push(script);
    }

    return () => {
      if (prevCanonical.current) {
        prevCanonical.current.remove();
        prevCanonical.current = null;
      }
      prevJsonLd.current.forEach((el) => el.remove());
      prevJsonLd.current = [];
    };
  }, [title, description, keywords, canonical, ogImage, ogType, breadcrumbs, article]);
}

function setMeta(name: string, content?: string, propertyContent?: string, isProperty = false) {
  const attr = isProperty || name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name';
  const selector = `meta[${attr}="${name}"]`;

  if (propertyContent) {
    let meta = document.querySelector(selector);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attr, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', propertyContent);
  } else if (content) {
    let meta = document.querySelector(selector);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attr, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }
}

export default useSEO;
