import type { LanguagePack } from './types'

export const html: LanguagePack = {
  id: 'html',
  name: 'HTML',
  zhName: 'HTML',
  color: '#e34f26',
  gradient: 'from-orange-500 to-red-600',
  icon: '🌐',
  tagline: '万物互联的骨架',
  description: '网页结构的基石语言，配合 CSS 与 JavaScript 构建整个前端世界。',
  playgroundTemplate: `<h1>Hello, CodeMatrix!</h1>
<p>这是一个 <b>实时渲染</b> 的 HTML 页面。</p>
<ul>
  <li>左侧编写代码</li>
  <li>右侧立即预览</li>
</ul>
<button onclick="this.textContent='已点击 ✓'">点我试试</button>

<style>
  body { font-family: sans-serif; padding: 20px; background: #0d1117; color: #58e6d9; }
  button { background: #58e6d9; border: none; padding: 8px 20px;
           border-radius: 20px; cursor: pointer; font-weight: bold; }
  li { margin: 6px 0; }
</style>`,
  chapters: [
    {
      id: 'html-ch1',
      title: '第 1 章 HTML 入门与文档结构',
      intro: '网页的本质、标签语法、标准文档骨架。',
      sections: [
        {
          title: '1.1 HTML 是什么',
          content: [
            'HTML（HyperText Markup Language，超文本标记语言）不是编程语言，而是标记语言：用标签描述内容的结构与语义，浏览器负责解析渲染。它不涉及逻辑运算，只负责"页面上有什么"。',
            '标签基本形式：<标签名 属性="值">内容</标签名>。标签不区分大小写但统一用小写；属性值用双引号；标签必须正确嵌套（先开后闭，不允许交叉）。',
            'HTML 负责结构，CSS 负责样式，JavaScript 负责行为——前端三剑客分工明确。一个按钮长什么样是 HTML+CSS，点击后发生什么由 JavaScript 接管。',
            '块级元素（p、h1~h6、div、ul、table）独占一行；行内元素（span、a、img、strong）共处一行。display 属性可以转换二者，这是布局的底层概念。',
          ],
          code: {
            lang: 'html',
            caption: '标准 HTML5 文档骨架',
            source: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个网页</title>
</head>
<body>
    <h1>你好，世界！</h1>
    <p>这是一个段落。</p>
</body>
</html>`,
          },
        },
        {
          title: '1.2 文档结构详解',
          content: [
            '<!DOCTYPE html> 声明 HTML5 文档类型，必须放在第一行，缺失会让浏览器进入怪异模式（quirks mode），布局表现不可预期。',
            '<head> 存放元信息：charset 声明编码（不写会乱码）、viewport 适配移动端、title 显示在标签页标题栏、link 引入外部 CSS、script 引入 JS。这些都不显示在页面上。',
            '<body> 是可见内容的容器。注释写法 <!-- 注释 -->，不会显示在页面中，可用于临时屏蔽代码调试。',
            'meta viewport 详解：width=device-width 让页面宽度等于设备宽度，initial-scale=1.0 禁止默认缩放——移动端页面的必备一行。',
          ],
        },
        {
          title: '1.3 全局属性与调试工具',
          content: [
            '全局属性所有标签通用：id（唯一标识）、class（类名，可多个空格分隔）、style（内联样式）、title（悬停提示）、hidden（隐藏）、data-*（自定义数据）。',
            'id 唯一而 class 可复用：id 像身份证号（页面唯一，CSS 用 # 选中），class 像班级（可复用，CSS 用 . 选中）。',
            '浏览器开发者工具（F12）：Elements 面板查看/修改 DOM 与样式、Console 看报错、Network 看请求——前端调试的第一武器。',
          ],
        },
      ],
      quiz: [
        {
          question: 'HTML5 的文档类型声明是？',
          options: ['A. <!DOCTYPE html>', 'B. <html5>', 'C. <!DOCTYPE HTML5>', 'D. <doctype>html</doctype>'],
          answer: 'A',
          explanation: '<!DOCTYPE html> 是 HTML5 唯一标准声明，必须位于文档第一行，否则浏览器进入怪异模式。',
        },
        {
          question: '页面标签页上显示的标题由 ______ 标签决定，它必须放在 ______ 标签内。',
          answer: '<title>；<head>',
          explanation: 'head 放元信息（不显示在页面上），body 放可见内容。title 写在 body 中是无效的。',
        },
        {
          question: 'HTML 注释的正确写法是？',
          options: ['A. // 注释', 'B. /* 注释 */', 'C. <!-- 注释 -->', 'D. # 注释'],
          answer: 'C',
          explanation: '// 是 JS 注释，/* */ 是 CSS 注释，# 是 Python 注释，HTML 用 <!-- -->。',
        },
      ],
    },
    {
      id: 'html-ch2',
      title: '第 2 章 文本、链接与图片',
      intro: '标题段落、超链接 a、图片 img 与路径。',
      sections: [
        {
          title: '2.1 文本标签',
          content: [
            '标题 h1~h6 从大到小，一个页面建议只有一个 h1（利于 SEO）。p 是段落，br 换行（自闭合），hr 水平线。',
            '语义强调：strong（重要，默认加粗）、em（强调，默认斜体）、mark（高亮）、del/s（删除线）、sub/sup（上下标，如 H<sub>2</sub>O、x<sup>2</sup>）。b 和 i 只有样式没有语义，HTML5 推荐用语义标签。',
            '特殊字符实体：&lt;（<）、&gt;（>）、&amp;（&）、&nbsp;（不断行空格）、&copy;（©）。想在页面显示 <div> 字样必须转义。',
            'pre 标签保留原文的换行与空格（代码展示专用）；code 标签标记代码文本；blockquote 长引用。',
          ],
        },
        {
          title: '2.2 超链接与图片',
          content: [
            'a 标签三属性：href 目标地址、target="_blank" 新窗口打开、title 悬停提示。href="#id" 锚点跳转；href="mailto:a@b.com" 发邮件；href="tel:10086" 拨号。',
            'img 是自闭合标签：<img src="cat.jpg" alt="一只猫">。alt 在图片加载失败时显示，也是屏幕阅读器的依据，必须养成书写习惯。width/height 控制尺寸。',
            '路径：相对路径 ./img/a.png（当前目录）、../（上级）；绝对路径 /img/a.png 或完整 URL。路径错误是新手图片不显示的首要原因。',
            'target 四个值：_self（默认，当前窗口）、_blank（新窗口）、_parent、_top（跳出框架）。',
          ],
          code: {
            lang: 'html',
            source: `<a href="https://www.example.com" target="_blank" title="示例">访问示例网站</a>
<a href="#section2">跳转到本页第二节</a>
<img src="./images/logo.png" alt="网站 Logo" width="200">`,
          },
        },
      ],
      quiz: [
        {
          question: '下列标签中属于行内元素的是？',
          options: ['A. <p>', 'B. <div>', 'C. <span>', 'D. <h1>'],
          answer: 'C',
          explanation: 'span 是行内元素；p、div、h1 都是块级元素，独占一行。',
        },
        {
          question: '在页面中显示"<p>"字样，应写为 ______。',
          answer: '&lt;p&gt;',
          explanation: '< 和 > 是 HTML 语法符号，显示文本时必须用字符实体转义。',
        },
        {
          question: '当前页面为 /news/2026/a.html，要引用 /images/logo.png，正确的相对路径是？',
          options: ['A. images/logo.png', 'B. ../images/logo.png', 'C. ../../images/logo.png', 'D. /2026/images/logo.png'],
          answer: 'C',
          explanation: '从 /news/2026/ 上溯两级（../..）回到根目录，再进入 images。',
        },
      ],
    },
    {
      id: 'html-ch3',
      title: '第 3 章 列表与表格',
      intro: 'ul/ol/dl 三种列表，table 全家桶与单元格合并。',
      sections: [
        {
          title: '3.1 三种列表',
          content: [
            '无序列表 ul + li（圆点，导航菜单标配）；有序列表 ol + li（数字序号，可用 type="A/a/i" 换编号样式、start 改起始值）；自定义列表 dl + dt（术语）+ dd（描述）。',
            'ul/ol 的直接子元素只能是 li，文字不能直接写在 ul 里。列表嵌套：把新的 ul/ol 放进某个 li 内部，形成多级结构——树形菜单的基础。',
            '配合 CSS 的 list-style:none 去掉圆点，再用 flex 横排，就是所有网站顶部导航栏的标准做法。',
          ],
        },
        {
          title: '3.2 表格',
          content: [
            'table 家族：tr 行、th 表头单元格（默认加粗居中）、td 数据单元格。语义分区：thead、tbody、tfoot；caption 是表格标题。',
            '单元格合并：colspan 跨列、rowspan 跨行。合并后被占据的位置不再写 td，否则表格错位——画格子图是解题神器。口诀：colspan 向右吃格子，rowspan 向下吃格子。',
            '表格样式速成：border-collapse:collapse 合并边框线；th, td 加 padding 和 border。现代网页布局用 CSS（Flex/Grid），不用 table 布局；table 回归展示"真正的表格数据"。',
          ],
          code: {
            lang: 'html',
            caption: '带合并单元格的课表',
            source: `<table border="1">
  <tr><th>时间</th><th>周一</th><th>周二</th></tr>
  <tr><td>上午</td><td colspan="2">数学（跨两列）</td></tr>
  <tr><td>下午</td><td>体育</td><td>音乐</td></tr>
</table>`,
          },
        },
      ],
      quiz: [
        {
          question: 'ul 的直接子元素只能是 ______ 标签。',
          answer: 'li',
          explanation: '文字或其他标签直接写在 ul 里会破坏结构，列表项必须包在 li 中。',
        },
        {
          question: '让一个单元格纵向跨两行，应使用的属性是？',
          options: ['A. colspan="2"', 'B. rowspan="2"', 'C. span="2"', 'D. merge="2"'],
          answer: 'B',
          explanation: 'colspan 横向跨列，rowspan 纵向跨行。被合并位置下一行要少写一个 td。',
        },
        {
          question: '现代网页布局推荐使用 ______ 而非 table。',
          answer: 'CSS（Flex 弹性布局 / Grid 网格布局）',
          explanation: 'table 布局是 2000 年代的遗风：语义混乱、响应式差。table 只用于展示真正的表格数据。',
        },
      ],
    },
    {
      id: 'html-ch4',
      title: '第 4 章 表单',
      intro: 'form、input 十八般类型、下拉与多行文本、表单验证。',
      sections: [
        {
          title: '4.1 form 与 input',
          content: [
            'form 的两个核心属性：action 提交目标 URL、method 提交方式（get 参数拼在 URL 可见，适合查询；post 放在请求体，适合注册登录）。',
            'input 的 type 决定形态：text、password（掩码）、radio（单选，同 name 互斥）、checkbox（多选）、number、date、color、range、file、hidden、submit、reset、button。',
            'name 是提交时的键，没有 name 的控件不会被提交（最隐蔽的 bug 来源）。value 对于文本框是默认值，对于单复选框是提交的值。checked 默认选中，disabled 禁用（不提交），readonly 只读（会提交）。',
            'label 的 for 属性关联控件 id，点击文字即可聚焦输入框，提升可用性；或直接把控件包在 label 里。',
          ],
          code: {
            lang: 'html',
            caption: '注册表单示例',
            source: `<form action="/register" method="post">
  <label>用户名：<input type="text" name="username" required></label>
  <label>密码：<input type="password" name="pwd" minlength="6"></label>
  <p>性别：
    <input type="radio" name="gender" value="m" checked> 男
    <input type="radio" name="gender" value="f"> 女
  </p>
  <input type="submit" value="注册">
</form>`,
          },
        },
        {
          title: '4.2 下拉、文本域与验证',
          content: [
            'select + option 下拉框，option 的 value 是提交值（不写 value 则提交显示文本）；selected 默认选中；multiple 多选（按住 Ctrl）。',
            'textarea 多行文本：rows/cols 控制尺寸，内容写在标签对之间而不是 value 属性——这是与 input 的关键区别。',
            'HTML5 内置验证：required 必填、minlength/maxlength、min/max、pattern 正则、type="email" 自动校验格式。form 加 novalidate 可关闭整表验证。',
            'button 的 type 默认为 submit（在 form 内会提交表单！），只想做普通按钮必须写 type="button"。',
          ],
        },
      ],
      quiz: [
        {
          question: '要实现"男/女"单选互斥，两个 input 的关键设置是？',
          options: ['A. type="radio" 且 name 相同', 'B. type="radio" 且 id 相同', 'C. type="checkbox"', 'D. type="single"'],
          answer: 'A',
          explanation: 'radio 靠相同的 name 分组互斥；name 不同则各自独立可以多选。',
        },
        {
          question: 'textarea 的默认内容应该写在哪里？',
          answer: '写在 <textarea> 与 </textarea> 标签对之间（它没有 value 属性）',
          explanation: 'input 是自闭合用 value；textarea 是成对标签用标签内容——高频辨析点。',
        },
        {
          question: '表单中 disabled 与 readonly 的区别是？',
          answer: 'disabled 的控件不随表单提交；readonly 只读但会随表单提交',
          explanation: '两者都不能编辑，区别在于数据是否提交给服务器——后端开发尤其要注意。',
        },
        {
          question: '让输入框必填的 HTML5 属性是 ______。',
          answer: 'required',
          explanation: '提交时浏览器自动拦截并提示，无需 JavaScript。',
        },
      ],
    },
    {
      id: 'html-ch5',
      title: '第 5 章 多媒体与语义化布局',
      intro: 'audio/video、HTML5 语义标签与 iframe。',
      sections: [
        {
          title: '5.1 音频与视频',
          content: [
            'video 标签：src、controls（显示控制条，不加用户无法播放控制）、autoplay（多数浏览器要求静音 muted 才允许）、loop、poster（封面图）。多个 source 子元素提供备选格式，浏览器自上而下挑能播的。',
            'audio 用法类似：controls、loop、preload。embed 与 object 是旧式嵌入方式，了解即可。',
            '常见格式：视频 mp4（兼容性最好）/webm；音频 mp3/ogg。',
          ],
        },
        {
          title: '5.2 语义化标签',
          content: [
            'HTML5 布局标签：header（页眉）、nav（导航）、main（主体，一个页面唯一）、article（独立文章）、section（章节）、aside（侧边栏）、footer（页脚）、figure+figcaption（图文组合）。',
            '语义化的价值：SEO 友好、屏幕阅读器可读（无障碍）、代码结构清晰。div/span 是无语义的通用容器，语义标签能表达时优先用语义标签。',
            'iframe 把另一个页面嵌入当前页：<iframe src="page.html">，注意 sandbox 安全属性与跨域限制（X-Frame-Options 可禁止被嵌入）。',
          ],
          code: {
            lang: 'html',
            caption: '语义化页面骨架',
            source: `<header>网站 Logo 与导航</header>
<nav><a href="/">首页</a> <a href="/about">关于</a></nav>
<main>
  <article>
    <h1>文章标题</h1>
    <section>正文第一段……</section>
  </article>
  <aside>侧边栏推荐</aside>
</main>
<footer>版权信息 © 2026</footer>`,
          },
        },
      ],
      quiz: [
        {
          question: '表示页面主导航区域最合适的标签是？',
          options: ['A. <div class="nav">', 'B. <nav>', 'C. <menu>', 'D. <header>'],
          answer: 'B',
          explanation: 'nav 是 HTML5 专为导航设计的语义标签；header 是页眉，范围更大。',
        },
        {
          question: 'video 标签中，控制条（播放/进度/音量）由 ______ 属性开启。',
          answer: 'controls',
          explanation: '不加 controls 视频没有任何操作界面；autoplay 在多数浏览器中必须配合 muted。',
        },
        {
          question: '一个页面中 main 标签最多出现 ______ 次。',
          answer: '1',
          explanation: 'main 标识页面独一无二的主体内容；header/nav/footer 可以出现多次（如每个 article 自己的头部）。',
        },
      ],
    },
    {
      id: 'html-ch6',
      title: '第 6 章 CSS 入门（HTML 的最佳拍档）',
      intro: '三种引入方式、选择器、盒模型入门。',
      sections: [
        {
          title: '6.1 CSS 引入与选择器',
          content: [
            '三种引入方式：内联 style="color:red"（优先级最高，维护最差）、内部 <style> 标签、外部 <link rel="stylesheet" href="a.css">（工程推荐，可缓存可复用）。',
            '基础选择器：* 通配、标签名、.class（可复用）、#id（唯一）；组合：空格后代（div p）、> 子代（div>p）、, 分组；伪类 :hover（悬停）、:first-child、:nth-child(n)。',
            '优先级口诀：内联 > #id > .class > 标签；同级后者覆盖前者（层叠）。!important 强制最高，但能不用就不用。',
            '属性选择器进阶：input[type="text"] 精确匹配、[class^="btn"] 开头匹配、[href$=".pdf"] 结尾匹配。',
          ],
        },
        {
          title: '6.2 盒模型与常用属性',
          content: [
            '盒模型：content（内容）→ padding（内边距）→ border（边框）→ margin（外边距）。标准盒模型 width 只算内容，box-sizing: border-box 后 width 包含到边框，布局更直觉（主流项目都会全局设置）。',
            '常用属性速查：color/background、font-size/font-weight、text-align、line-height（行高，垂直居中神器）、border-radius（圆角，50% 变圆形）、box-shadow（阴影）、display（block/inline/flex/none）。',
            '居中三板斧：文字 text-align:center；块级定宽 margin:0 auto；万能 flex：display:flex; justify-content:center; align-items:center。',
            'display:none 与 visibility:hidden 的区别：前者彻底移除不占空间，后者隐身但保留位置——高频考点。',
          ],
          code: {
            lang: 'html',
            caption: '内嵌 CSS 美化卡片',
            source: `<style>
  .card {
    width: 300px; padding: 20px;
    background: #1a1a2e; color: #eee;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,.5);
  }
  .card:hover { transform: translateY(-4px); }
</style>
<div class="card">
  <h3>暗黑卡片</h3>
  <p>悬停我试试浮动效果。</p>
</div>`,
          },
        },
        {
          title: '6.3 Flex 弹性布局入门',
          content: [
            'Flex 是现代布局首选：容器设 display:flex，子元素自动排成一行。主轴 justify-content（center/space-between/space-around），交叉轴 align-items（center/stretch）。',
            'flex-direction:row（默认横排）/column（竖排）；flex-wrap:wrap 允许换行；子元素 flex:1 平分剩余空间。',
            '经典布局一行流：三栏等分 justify-content:space-between + 每个 flex:1；垂直水平居中 justify/align 双 center。',
          ],
        },
      ],
      quiz: [
        {
          question: 'CSS 选择器优先级从高到低正确的是？',
          options: ['A. 标签 > class > id', 'B. id > class > 标签', 'C. class > id > 标签', 'D. 三者相同'],
          answer: 'B',
          explanation: '内联 > #id > .class > 标签；同级后者覆盖前者。',
        },
        {
          question: '盒模型从内到外的正确顺序是 ______。',
          answer: 'content → padding → border → margin',
          explanation: 'padding 是内边距（内容与边框之间），margin 是外边距（盒子与邻居之间）。',
        },
        {
          question: 'display:none 与 visibility:hidden 的区别是？',
          options: [
            'A. 完全相同',
            'B. none 不占空间，hidden 占位但不可见',
            'C. hidden 不占空间，none 占位',
            'D. 都占位',
          ],
          answer: 'B',
          explanation: 'none 从渲染树中移除；hidden 只是隐身，位置还在。',
        },
        {
          question: '用 Flex 让子元素水平垂直双居中，容器需要写 ______。',
          answer: 'display:flex; justify-content:center; align-items:center;',
          explanation: 'justify-content 管主轴（默认水平），align-items 管交叉轴（默认垂直）。',
        },
      ],
    },
    {
      id: 'html-ch7',
      title: '第 7 章 CSS 进阶布局',
      intro: '掌握了盒模型和 Flex 之后，本章补齐布局的最后拼图：position 定位、Grid 网格、响应式媒体查询。学完你就能复刻绝大多数网页的版式。',
      sections: [
        {
          title: '7.1 定位 position',
          content: [
            '`position: relative` 相对定位：相对自己原来的位置偏移，不脱离文档流，常用来给子元素"当参照物"。',
            '`position: absolute` 绝对定位：相对最近的非 static 祖先定位，脱离文档流（不占地）。父元素没设 relative，它会一路找到 body。',
            '`position: fixed` 固定定位：相对浏览器窗口定位，滚动不走，导航栏、回到顶部按钮都靠它。',
            '`position: sticky` 粘性定位：正常排版，滚动到阈值时"吸"住不动——表头吸顶、章节标题吸顶的神器。',
            '层叠顺序 z-index：定位元素可用 z-index 控制谁压谁，数值大的在上层。',
          ],
          code: {
            lang: 'css',
            caption: '四种定位一览',
            source: `.card     { position: relative; }        /* 为子元素提供参照 */
.badge    { position: absolute; top: -8px; right: -8px; } /* 角标压在卡片右上角 */
.navbar   { position: fixed; top: 0; width: 100%; }       /* 吸顶导航栏 */
.thead    { position: sticky; top: 0; background: #fff; } /* 滚动时表头吸顶 */
.modal    { z-index: 999; }  /* 弹窗永远在最上层 */`,
          },
        },
        {
          title: '7.2 Grid 网格布局',
          content: [
            '`Grid` 是二维布局系统：Flex 管"一行/一列"，Grid 同时管行和列。容器设 display: grid 即可启用。',
            'grid-template-columns: 200px 1fr 1fr 定义三列：第一列固定 200px，剩下两列平分剩余空间。fr 是"份额"单位，像切蛋糕。',
            'grid-gap: 16px 设置网格间距，再也不用给每个格子算 margin。',
            'grid-column: span 2 让某个格子横跨两列，轻松实现不规则排版（大图 + 小图组合）。',
            'Grid vs Flex 选型：一维排列用 Flex，二维网格用 Grid，两者常嵌套配合。',
          ],
          code: {
            lang: 'css',
            caption: 'Grid 快速上手',
            source: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 三等分 */
  gap: 16px;
}
.gallery .hero {
  grid-column: span 2;  /* 大图横跨两列 */
  grid-row: span 2;
}

/* 经典圣杯布局：头/侧栏/主区/尾 */
.page {
  display: grid;
  grid-template: "h h" 60px "s m" 1fr "f f" 40px / 200px 1fr;
}`,
          },
        },
        {
          title: '7.3 响应式与媒体查询',
          content: [
            '`响应式设计`：同一套网页，在手机、平板、电脑上都好看。核心是"流动的布局 + 按屏幕宽度切换样式"。',
            '`媒体查询` @media (max-width: 768px) { ... } 里的样式只在屏幕宽不超过 768px 时生效——是响应式的开关。',
            '移动优先（Mobile First）：先写手机样式，再用 min-width 媒体查询逐步增强到大屏，业界主流做法。',
            '相对单位：% 相对父元素、vw/vh 相对视口宽高、rem 相对根字号。多用相对单位，布局天然有弹性。',
            '图片防溢出：img { max-width: 100%; height: auto; } 是响应式页面的标配第一行。',
          ],
          code: {
            lang: 'css',
            caption: '移动优先的响应式写法',
            source: `/* 默认：手机，单列 */
.cards { display: grid; grid-template-columns: 1fr; gap: 12px; }

/* 平板：两列 */
@media (min-width: 768px) {
  .cards { grid-template-columns: 1fr 1fr; }
}

/* 电脑：三列 */
@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}

img { max-width: 100%; height: auto; }`,
          },
        },
      ],
      quiz: [
        {
          question: '想让元素固定在浏览器窗口右下角、滚动不移动，应该用？',
          options: ['A. position: relative', 'B. position: absolute', 'C. position: fixed', 'D. position: sticky'],
          answer: 'C',
          explanation: 'fixed 相对视口定位，不随滚动移动；absolute 会随页面滚动；sticky 要滚到阈值才吸住。',
        },
        {
          question: 'grid-template-columns: 200px 1fr 2fr 表示的三列宽度关系是？',
          answer: '第一列固定 200px；剩余空间第二列占 1 份、第三列占 2 份（即第三列是第二列的两倍）',
          explanation: 'fr 是剩余空间的份额单位：扣除固定列后，按 1:2 的比例分配剩余宽度。',
        },
      ],
    },
    {
      id: 'html-ch8',
      title: '第 8 章 JavaScript 入门与网页交互',
      intro: 'HTML 负责结构，CSS 负责外观，JavaScript 负责"动起来"。本章学会 JS 的引入方式、DOM 操作和事件响应，让网页从"静态海报"变成"可交互应用"。',
      sections: [
        {
          title: '8.1 JS 的引入与基础语法',
          content: [
            '`JavaScript` 是浏览器的内置编程语言。引入方式两种：内嵌 <script>代码</script>，或外链 <script src="app.js"></script>，一般放在 body 末尾（等 HTML 先加载完）。',
            '变量：let 声明可变变量、const 声明常量（推荐默认用 const），老关键字 var 有坑已不推荐。类型动态：数字、字符串、布尔、数组、对象。',
            '函数：function add(a, b) { return a + b; } 或箭头函数 const add = (a, b) => a + b;，后者是现代写法。',
            '打印调试：console.log(x) 输出到浏览器控制台（F12 打开），是 JS 的 printf。',
            'JS 大小写敏感、语句可省略分号（但建议写），注释同样是 // 和 /* */。',
          ],
          code: {
            lang: 'html',
            caption: '内嵌与外链 JS',
            source: `<!DOCTYPE html>
<html>
<body>
  <h1 id="title">你好</h1>

  <script>
    const name = "弈";               // 常量
    let count = 0;                   // 变量
    const greet = n => "Hello, " + n; // 箭头函数
    console.log(greet(name));        // F12 控制台查看
  </script>
  <!-- 或者外链：<script src="app.js"></script> -->
</body>
</html>`,
          },
        },
        {
          title: '8.2 DOM 操作',
          content: [
            '`DOM`（文档对象模型）：浏览器把 HTML 解析成一棵节点树，JS 通过 DOM 就能读写页面上的任何内容。',
            '找元素：document.getElementById("title") 按 id；document.querySelector(".box") 按 CSS 选择器找第一个；querySelectorAll 找全部。',
            '改内容：el.textContent = "新文字" 改纯文本；el.innerHTML = "<b>粗</b>" 解析 HTML（有安全风险，别塞用户输入）。',
            '改样式与类名：el.style.color = "red" 改单个样式；el.classList.add("active") / remove / toggle 操作类名（更推荐，样式留在 CSS 里）。',
            '增删元素：document.createElement 创建，parent.appendChild 或 parent.append 挂载，el.remove() 删除。',
          ],
          code: {
            lang: 'html',
            caption: 'DOM 增删改查一条龙',
            source: `<ul id="list"></ul>
<button id="addBtn">添加一项</button>

<script>
  const list = document.getElementById("list");
  document.getElementById("addBtn").onclick = () => {
    const li = document.createElement("li"); // 创建
    li.textContent = "第 " + (list.children.length + 1) + " 项"; // 改内容
    li.classList.add("item");                // 加类名
    list.appendChild(li);                    // 挂载
  };
</script>`,
          },
        },
        {
          title: '8.3 事件与计时器',
          content: [
            '`事件`是用户动作的"通知"：click 点击、input 输入、keydown 按键、submit 提交、mouseover 悬停……',
            '监听事件的标准写法：btn.addEventListener("click", 处理函数)。比 el.onclick 更灵活（可挂多个监听、可移除）。',
            '事件对象 e：处理函数的第一个参数，e.target 是触发元素，e.preventDefault() 阻止默认行为（如表单提交跳转）。',
            '`setTimeout(fn, 1000)` 延迟执行一次；`setInterval(fn, 1000)` 每隔一段重复执行，clearInterval 停止。做倒计时、轮播都靠它。',
            '表单取值：input.value 拿到输入框当前内容，配合 click/submit 事件就是一个完整的交互闭环。',
          ],
          code: {
            lang: 'html',
            caption: '事件监听 + 计时器：一个 10 秒倒计时',
            source: `<p>剩余 <span id="t">10</span> 秒</p>
<button id="btn">开始</button>

<script>
  document.getElementById("btn").addEventListener("click", () => {
    let n = 10;
    const timer = setInterval(() => {
      n--;
      document.getElementById("t").textContent = n;
      if (n <= 0) {
        clearInterval(timer);   // 记得停止
        alert("时间到！");
      }
    }, 1000);
  });
</script>`,
          },
        },
      ],
      quiz: [
        {
          question: '把 HTML 解析成 JS 可以操作的节点树，这个机制叫？',
          options: ['A. CSS', 'B. DOM', 'C. HTTP', 'D. URL'],
          answer: 'B',
          explanation: 'DOM（文档对象模型）是 HTML 文档在内存中的树状表示，JS 的一切页面操作都通过它完成。',
        },
        {
          question: '修改元素文字内容，安全且推荐的属性是？',
          answer: 'textContent；innerHTML 会解析 HTML 标签，拼接用户输入时有 XSS 安全风险',
          explanation: 'textContent 只当纯文本处理，天然免疫注入；确需插入 HTML 结构时才用 innerHTML，且绝不拼接未过滤的用户输入。',
        },
        {
          question: 'setInterval 启动的计时器如何停止？',
          answer: '用返回值保存计时器 id，调用 clearInterval(id) 停止',
          explanation: 'const timer = setInterval(...); clearInterval(timer)。忘记停止会导致计时器一直跑，是常见泄漏。',
        },
      ],
    },
  ],
  patterns: [
    {
      id: 'html-p1',
      title: '选择题：标签语义与嵌套规则',
      category: '选择题',
      difficulty: 1,
      analysis: [
        '考查"哪个标签干什么用"。记忆策略：按功能分组背——文本组、结构组、表单组、媒体组。',
        '嵌套规则常考：a 不能套 a，p 里不能放 div（块级），button 里不能放 button。',
      ],
      keyPoints: ['块级 vs 行内', 'h1 唯一性', 'strong/em 语义优先', 'ul 的直接子元素只能是 li'],
      example: {
        question: '下列嵌套合法的是？A. <ul><p><li>项</li></p></ul>  B. <p><div>块</div></p>  C. <ul><li>项</li></ul>  D. <a href="#"><a href="#">链接</a></a>',
        answer: 'C',
        explanation: 'ul 的直接子元素只能是 li；p 不能包含块级元素 div；a 不允许嵌套 a。只有 C 合法。',
      },
      traps: ['以为标签可以随意嵌套', 'br 写成 </br>', 'img 忘记自闭合或缺 alt'],
    },
    {
      id: 'html-p2',
      title: '程序填空：表单控件',
      category: '程序填空',
      difficulty: 2,
      analysis: [
        '表单填空围绕"控件类型选择 + 关键属性"。判断逻辑：要单选用 radio+同 name；多选用 checkbox；提交值看 value 与 name。',
        'HTML5 验证属性是近年热点：required、pattern、min/max。',
      ],
      keyPoints: ['radio 靠 name 分组互斥', 'name 缺失不提交', 'label for 关联 id', 'button 三种 type'],
      example: {
        question: '补全代码，实现"男/女"单选且默认选男：<input type="____" name="gender" value="m" ____> 男',
        answer: 'radio；checked',
        explanation: 'type="radio" + 相同 name 实现互斥；checked 让该项默认选中。',
      },
      traps: ['radio 写成 checkbox', 'name 不一致导致可以多选', '把 checked 写成 selected（那是 option 的）'],
    },
    {
      id: 'html-p3',
      title: '读代码写表现：表格合并',
      category: '读程序写结果',
      difficulty: 3,
      analysis: [
        'colspan/rowspan 题必须画格子：先画完整 N 行 M 列网格，再按标签顺序填充，合并格涂掉被占据位置。',
        '口诀：colspan 向右吃格子，rowspan 向下吃格子，被吃掉的格子不再写 td。',
      ],
      keyPoints: ['colspan 跨列', 'rowspan 跨行', '被合并位不写 td', 'border 只是表现'],
      example: {
        question: '<table><tr><td colspan="2">A</td></tr><tr><td>B</td><td>C</td></tr></table> 渲染后第二行有几个单元格？',
        answer: '两个：B 和 C',
        explanation: '第一行的 A 横向占据两列；第二行正常从左到右放 B、C。若第二行写了三个 td 就会错位凸出。',
      },
      traps: ['合并后仍写被占位置的 td', 'rowspan 影响下下几行数不清', '把 caption 当成一行 tr'],
    },
    {
      id: 'html-p4',
      title: '编程题：静态页面搭建',
      category: '编程题',
      difficulty: 3,
      analysis: [
        '页面搭建题的评分维度：结构完整（DOCTYPE/html/head/body）、标签语义正确、表单控件齐全、必要属性不缺（alt、name、action）。',
        '答题顺序：先搭骨架，再填内容，最后加属性细节。写完在浏览器里实际打开检查。',
      ],
      keyPoints: ['标准骨架默写', '语义标签选型', '表单完整性', '路径书写'],
      example: {
        question: '编写一个个人简介页：包含页面标题"关于我"、一张图片、一段自我介绍、一个含"姓名/邮箱/提交按钮"的表单。',
        answer: '见题型剖析中的骨架 + form 示例组合；关键得分点：img 带 alt、input 带 name 与 required、submit 按钮。',
        explanation: '综合考查文档结构、图片、段落与表单四大知识块的组合运用。',
      },
      traps: ['忘记 meta charset 导致中文乱码', 'input 缺 name', 'title 写在 body 里'],
    },
    {
      id: 'html-p5',
      title: '选择题：路径与链接',
      category: '选择题',
      difficulty: 2,
      analysis: [
        '路径题先定位"当前文件所在目录"，再数 ../ 的层数。牢记：./ 当前目录（可省略），../ 上一级，/ 开头是网站根目录。',
        'target 四个值：_self（默认，当前窗口）、_blank（新窗口）、_parent、_top。',
      ],
      keyPoints: ['相对路径层级', '锚点 href="#id"', 'mailto/tel 协议', '_blank 新窗口'],
      example: {
        question: '当前页面为 /news/2026/a.html，要引用 /images/logo.png，正确的相对路径是？',
        answer: '../../images/logo.png',
        explanation: '从 /news/2026/ 上溯两级回到根目录，再进入 images。',
      },
      traps: ['../ 层数多数或少数一级', '把 src 写成 href', '反斜杠 \\ 与正斜杠 / 混用'],
    },
    {
      id: 'html-p6',
      title: '程序改错：常见标签错误',
      category: '程序改错',
      difficulty: 1,
      analysis: [
        'HTML 改错高频四宗罪：标签未闭合、属性缺引号、嵌套交叉（<b><i></b></i>）、拼写错误（herf、imput）。',
        '浏览器对错误很宽容（会"猜"着渲染），但考试按规范判错，必须按标准语法检查。',
      ],
      keyPoints: ['标签成对出现', '交叉嵌套非法', '属性值加引号', 'DOCTYPE 在首行'],
      example: {
        question: '改错：<a herf="index.html">首页</a>',
        answer: 'href 拼写错误，应为 <a href="index.html">首页</a>',
        explanation: '属性名拼写错误浏览器直接忽略，链接失效但不报错——这类错误最难排查，要逐字母核对。',
      },
      traps: ['<img> 写成 <image>', '属性值忘记加引号', '中文标点混入属性'],
    },
  ],
  exercises: [
    {
      id: 'html-e1', type: 'choice', title: '文档声明', difficulty: 1, tags: ['基础'],
      question: 'HTML5 的文档类型声明是？',
      options: ['A. <!DOCTYPE html>', 'B. <html5>', 'C. <!DOCTYPE HTML5>', 'D. <doctype>html</doctype>'],
      answer: 'A',
      explanation: '<!DOCTYPE html> 是 HTML5 唯一标准声明，必须位于文档第一行。',
    },
    {
      id: 'html-e2', type: 'choice', title: '行内与块级', difficulty: 2, tags: ['元素'],
      question: '下列标签中属于行内元素的是？',
      options: ['A. <p>', 'B. <div>', 'C. <span>', 'D. <h1>'],
      answer: 'C',
      explanation: 'span 是行内元素；p、div、h1 都是块级元素，独占一行。',
    },
    {
      id: 'html-e3', type: 'choice', title: '表单控件', difficulty: 2, tags: ['表单'],
      question: '要实现"多选一"且提交值为选中项，应使用？',
      options: [
        'A. 多个 checkbox，name 相同',
        'B. 多个 radio，name 相同',
        'C. 多个 radio，name 各不相同',
        'D. 多个 text',
      ],
      answer: 'B',
      explanation: 'radio 单选按钮靠相同的 name 实现互斥分组；name 不同则各自独立可多选。',
    },
    {
      id: 'html-e4', type: 'choice', title: '路径计算', difficulty: 3, tags: ['路径'],
      question: '页面位于 /a/b/page.html，要引用 /a/pic.jpg，相对路径应写？',
      options: ['A. pic.jpg', 'B. ../pic.jpg', 'C. ../../pic.jpg', 'D. /a/b/pic.jpg'],
      answer: 'B',
      explanation: '从 /a/b/ 上溯一级到 /a/，故 ../pic.jpg。',
    },
    {
      id: 'html-e5', type: 'choice', title: '语义化标签', difficulty: 2, tags: ['HTML5'],
      question: '表示页面主导航区域最合适的标签是？',
      options: ['A. <div class="nav">', 'B. <nav>', 'C. <menu>', 'D. <header>'],
      answer: 'B',
      explanation: 'nav 是 HTML5 专为导航设计的语义标签；header 是页眉，范围更大。',
    },
    {
      id: 'html-e6', type: 'fill', title: '补全图片标签', difficulty: 1, tags: ['图片'],
      question: '补全图片标签：显示 images 目录下的 cat.jpg，加载失败时显示"猫咪照片"：<img ______="images/cat.jpg" ______="猫咪照片">',
      answer: 'src；alt',
      explanation: 'src 指定图片来源，alt 提供替代文本（无障碍与加载失败时显示）。',
    },
    {
      id: 'html-e7', type: 'fill', title: '补全表格合并', difficulty: 3, tags: ['表格'],
      question: '让表头单元格横跨两列：<th ______="2">成绩</th>',
      answer: 'colspan',
      explanation: 'colspan 横向跨列，rowspan 纵向跨行。',
    },
    {
      id: 'html-e8', type: 'coding', title: '第一个网页', difficulty: 1, tags: ['基础结构'],
      question: '编写完整 HTML 页面：标题栏显示"我的主页"，页面中有一个一级标题"欢迎"和一个段落"这是我的第一个网页。"。运行后在下方预览查看效果。',
      starterCode: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <!-- 补全标题 -->

</head>
<body>
    <!-- 补全标题与段落 -->

</body>
</html>`,
      expectedOutput: '欢迎\n这是我的第一个网页。',
      answer: '<title>我的主页</title>；<h1>欢迎</h1><p>这是我的第一个网页。</p>',
      explanation: '考查标准文档骨架与最基本的文本标签。',
      hints: ['title 写在 head 里', 'h1 与 p 写在 body 里'],
    },
    {
      id: 'html-e9', type: 'coding', title: '购物清单列表', difficulty: 2, tags: ['列表'],
      question: '制作一个无序列表，包含三项：苹果、香蕉、橙子。预览中应看到三个带圆点的列表项。',
      starterCode: `<h2>购物清单</h2>
<!-- 在这里编写列表 -->

`,
      expectedOutput: '苹果\n香蕉\n橙子',
      answer: '<ul><li>苹果</li><li>香蕉</li><li>橙子</li></ul>',
      explanation: 'ul 包裹 li 是无序列表的标准结构。',
      hints: ['ul 的直接子元素只能是 li'],
    },
    {
      id: 'html-e10', type: 'coding', title: '登录表单', difficulty: 3, tags: ['表单'],
      question: '制作登录表单：用户名输入框（必填）、密码输入框（掩码）、提交按钮显示"登录"。要求 input 均有 name 属性。',
      starterCode: `<h2>用户登录</h2>
<form action="/login" method="post">
  <!-- 用户名 -->

  <!-- 密码 -->

  <!-- 提交按钮 -->

</form>`,
      expectedOutput: '用户登录\n登录',
      answer: '<input type="text" name="username" required placeholder="用户名">、<input type="password" name="password" placeholder="密码">、<input type="submit" value="登录">',
      explanation: 'type 决定控件形态；required 提供必填验证；name 保证数据被提交。',
      hints: ['password 类型自动掩码', 'submit 的 value 即按钮文字'],
    },
    {
      id: 'html-e11', type: 'coding', title: '成绩表格', difficulty: 3, tags: ['表格'],
      question: '制作 2 行 3 列带边框的成绩表：表头行"姓名/语文/数学"，数据行"弈/95/98"。',
      starterCode: `<table border="1">
  <!-- 表头行 -->

  <!-- 数据行 -->

</table>`,
      expectedOutput: '姓名\n语文\n数学\n弈\n95\n98',
      answer: '<tr><th>姓名</th><th>语文</th><th>数学</th></tr><tr><td>弈</td><td>95</td><td>98</td></tr>',
      explanation: 'th 表头加粗居中，td 普通单元格，tr 划分行。',
      hints: ['每行一个 tr', 'border="1" 显示边框'],
    },
    {
      id: 'html-e12', type: 'coding', title: 'CSS 美化按钮', difficulty: 4, tags: ['CSS'],
      question: '给页面添加一个按钮"发射 🚀"，并用内部 <style> 设置：背景色 #58e6d9、无边框、圆角 20px、内边距 10px 24px、鼠标悬停时背景变为 #7dd3fc。预览中悬停验证效果。',
      starterCode: `<style>
  /* 在这里编写按钮样式 */
  button {

  }
  button:hover {

  }
</style>
<button>发射 🚀</button>`,
      expectedOutput: '发射 🚀',
      answer: 'button { background:#58e6d9; border:none; border-radius:20px; padding:10px 24px; } button:hover { background:#7dd3fc; }',
      explanation: ':hover 伪类定义悬停状态；border-radius 实现圆角；padding 用两个值表示上下/左右。',
      hints: ['padding: 10px 24px', ':hover 紧跟选择器'],
    },
    {
      id: 'html-e13', type: 'choice', title: '选择器优先级', difficulty: 4, tags: ['CSS'],
      question: '对同一个 <p id="t" class="a"> 同时有 #t{color:red} 和 .a{color:blue}，文字最终颜色是？',
      options: ['A. blue（后写的生效）', 'B. red（id 优先于 class）', 'C. 黑色', 'D. 报错'],
      answer: 'B',
      explanation: '#id 优先级高于 .class，无论书写顺序。只有同优先级时才是后写覆盖先写。',
    },
    {
      id: 'html-e14', type: 'choice', title: '盒模型计算', difficulty: 4, tags: ['CSS'],
      question: '标准盒模型下 div 设置 width:100px; padding:10px; border:5px solid;，它在页面占据的总宽度是？',
      options: ['A. 100px', 'B. 120px', 'C. 130px', 'D. 115px'],
      answer: 'C',
      explanation: '100 + 10×2（左右 padding）+ 5×2（左右 border）= 130px。若设 box-sizing:border-box 则总宽就是 100px。',
    },
    {
      id: 'html-e15', type: 'choice', title: '表格合并计数', difficulty: 4, tags: ['表格'],
      question: '<table><tr><td rowspan="2">A</td><td>B</td></tr><tr><td>C</td><td>D</td></tr></table> 渲染后实际显示的单元格数量是？',
      options: ['A. 4', 'B. 3', 'C. 5', 'D. 表格错位'],
      answer: 'D',
      explanation: 'A 纵向跨两行，占据第 2 行第 1 列；第 2 行写了 C、D 两个 td，C 落在第 2 列，D 凸出到第 3 列——错位。正确写法第 2 行只写一个 td。',
    },
    {
      id: 'html-e16', type: 'choice', title: '表单提交行为', difficulty: 3, tags: ['表单'],
      question: 'form 内的 <button>点我</button> 没有写 type，点击后会？',
      options: ['A. 什么都不做', 'B. 提交表单（默认 type="submit"）', 'C. 刷新页面', 'D. 报错'],
      answer: 'B',
      explanation: 'form 内 button 默认 type="submit"。只想做普通按钮必须显式写 type="button"——隐蔽 bug 高发点。',
    },
    {
      id: 'html-e17', type: 'choice', title: 'Flex 布局', difficulty: 4, tags: ['CSS'],
      question: '容器 display:flex 后，让三个子元素水平方向两端对齐、中间留白均匀的属性是？',
      options: ['A. align-items:center', 'B. justify-content:space-between', 'C. flex-wrap:wrap', 'D. float:left'],
      answer: 'B',
      explanation: 'justify-content 控制主轴分布：space-between 两端对齐均分间隙；align-items 管交叉轴（垂直）。',
    },
    {
      id: 'html-e18', type: 'choice', title: 'iframe 安全', difficulty: 5, tags: ['HTML5'],
      question: '防止自己的页面被他人用 iframe 恶意嵌入（点击劫持），服务器应设置的响应头是？',
      options: ['A. Content-Type', 'B. X-Frame-Options', 'C. Cache-Control', 'D. Accept-Encoding'],
      answer: 'B',
      explanation: 'X-Frame-Options: DENY / SAMEORIGIN 控制页面是否允许被嵌入框架，是防点击劫持的标准手段。',
    },
    {
      id: 'html-e19', type: 'fill', title: '补全锚点链接', difficulty: 2, tags: ['链接'],
      question: '点击链接跳到本页 id 为"chapter3"的位置：<a href="______">去第三章</a>',
      answer: '#chapter3',
      explanation: 'href="#id" 是页内锚点跳转；配合目标元素的 id="chapter3"。',
    },
    {
      id: 'html-e20', type: 'fill', title: '补全媒体查询', difficulty: 5, tags: ['CSS'],
      question: '屏幕宽度小于 600px 时应用样式：@media (______: 600px) { ... }',
      answer: 'max-width',
      explanation: 'max-width 表示"不超过"该宽度生效；min-width 相反。响应式布局的核心语法。',
    },
    {
      id: 'html-e21', type: 'fill', title: '补全字符实体', difficulty: 3, tags: ['文本'],
      question: '在页面中显示"5 < 6"，应写作 5 ______ 6。',
      answer: '&lt;',
      explanation: '< 会被浏览器当成标签开始符，必须用字符实体 &lt; 转义。',
    },
    {
      id: 'html-e22', type: 'coding', title: '个人名片卡片', difficulty: 4, tags: ['CSS', '综合'],
      question: '制作一个名片卡片：div.card 内含 h3"弈"和 p"全栈学习者"，用 CSS 设置深色背景 #1a1a2e、圆角 12px、内边距 20px、文字浅色。预览检查效果。',
      starterCode: `<style>
  .card {
    /* 在这里编写样式 */

  }
</style>
<div class="card">
  <h3>弈</h3>
  <p>全栈学习者</p>
</div>`,
      expectedOutput: '弈\n全栈学习者',
      answer: '.card { background:#1a1a2e; color:#eee; border-radius:12px; padding:20px; }',
      explanation: '综合运用背景、文字颜色、圆角与内边距四个最常用的盒模型相关属性。',
      hints: ['background 与 color', 'border-radius: 12px', 'padding: 20px'],
    },
    {
      id: 'html-e23', type: 'coding', title: 'Flex 三栏布局', difficulty: 5, tags: ['CSS', '布局'],
      question: '用 Flex 实现三个方块水平排列且间距均匀：容器 display:flex + justify-content:space-around，每个方块 80×80 背景青色。预览检查效果。',
      starterCode: `<style>
  .row {
    /* 容器：flex 布局 */

  }
  .box {
    width: 80px; height: 80px;
    background: #58e6d9;
    border-radius: 8px;
  }
</style>
<div class="row">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>`,
      expectedOutput: '',
      answer: '.row { display:flex; justify-content:space-around; }',
      explanation: 'Flex 一行代码解决水平排列，justify-content 控制间距分布，比 float 方案优雅得多。',
      hints: ['display: flex', 'justify-content: space-around'],
    },
    {
      id: 'html-e24', type: 'coding', title: '悬停变色导航', difficulty: 4, tags: ['CSS', '链接'],
      question: '制作导航条：三个链接"首页/教程/关于"横排，默认文字灰色 #94a3b8，悬停变青色 #58e6d9 并显示下划线。预览中悬停验证。',
      starterCode: `<style>
  nav a {
    /* 默认样式 */

  }
  nav a:hover {
    /* 悬停样式 */

  }
</style>
<nav>
  <a href="#">首页</a>
  <a href="#">教程</a>
  <a href="#">关于</a>
</nav>`,
      expectedOutput: '首页\n教程\n关于',
      answer: 'nav a { color:#94a3b8; text-decoration:none; margin-right:16px; } nav a:hover { color:#58e6d9; text-decoration:underline; }',
      explanation: 'a 默认带下划线和蓝色，先 text-decoration:none 清除，再用 :hover 加回下划线实现交互反馈。',
      hints: ['text-decoration: none 去默认下划线', ':hover 中恢复 underline'],
    },
  ],
}
