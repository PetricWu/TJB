// 百度主动推送 Netlify Function
// 部署后自动调用，将新页面推送给百度站长平台

export default async (request, context) => {
  const BAIDU_PUSH_URL = 'http://data.zz.baidu.com/urls?site=https://tjb.petricw.com&token=nE0k7f8LJdpPWw9Q';
  
  const urls = [
    'https://tjb.petricw.com/',
    'https://tjb.petricw.com/about',
    'https://tjb.petricw.com/news',
    'https://tjb.petricw.com/teaching',
    'https://tjb.petricw.com/innovation',
    'https://tjb.petricw.com/moral',
    'https://tjb.petricw.com/student',
    'https://tjb.petricw.com/admission',
  ];

  try {
    const response = await fetch(BAIDU_PUSH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: urls.join('\n'),
    });
    const result = await response.json();
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
