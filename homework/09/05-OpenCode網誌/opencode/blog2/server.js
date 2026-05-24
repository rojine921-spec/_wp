const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { initDb, getDb, saveDb } = require('./database');
const { marked } = require('marked');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'blog-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const styles = `
<style>
  :root {
    --bg-primary: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
    --bg-secondary: #ffffff;
    --text-primary: #2c3e50;
    --text-secondary: #7f8c8d;
    --text-muted: #95a5a6;
    --accent: #3498db;
    --accent-hover: #2980b9;
    --border: #e0e0e0;
    --shadow: rgba(0,0,0,0.08);
    --shadow-hover: rgba(0,0,0,0.12);
    --code-bg: #f8f9fa;
  }
  [data-theme="dark"] {
    --bg-primary: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    --bg-secondary: #1e1e3f;
    --text-primary: #ecf0f1;
    --text-secondary: #bdc3c7;
    --text-muted: #7f8c8d;
    --accent: #5dade2;
    --accent-hover: #3498db;
    --border: #2c3e50;
    --shadow: rgba(0,0,0,0.3);
    --shadow-hover: rgba(0,0,0,0.5);
    --code-bg: #2c3e50;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    background: var(--bg-primary);
    min-height: 100vh;
    color: var(--text-primary);
    transition: all 0.3s ease;
  }
  .theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-secondary);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 1.5rem;
    box-shadow: 0 4px 15px var(--shadow);
    transition: all 0.3s ease;
    z-index: 100;
  }
  .theme-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px var(--shadow-hover);
  }
  .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
  header { 
    text-align: center; 
    margin-bottom: 40px;
    padding: 40px 0;
    position: relative;
  }
  header::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--accent);
    border-radius: 2px;
  }
  header h1 { 
    font-size: 2.5rem; 
    color: var(--text-primary); 
    margin-bottom: 10px;
    font-weight: 700;
    letter-spacing: -1px;
  }
  header p { color: var(--text-secondary); font-size: 1.1rem; }
  .nav { 
    display: flex; 
    gap: 15px; 
    justify-content: center; 
    margin-top: 20px;
    flex-wrap: wrap;
  }
  .btn { 
    background: var(--accent); 
    color: white; 
    padding: 12px 24px; 
    text-decoration: none; 
    border-radius: 25px;
    transition: all 0.3s ease;
    font-weight: 500;
    display: inline-block;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
  .btn:hover { 
    background: var(--accent-hover); 
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }
  .btn-secondary { background: var(--text-muted); }
  .btn-secondary:hover { background: var(--text-secondary); }
  .posts { display: flex; flex-direction: column; gap: 20px; }
  .post { 
    background: var(--bg-secondary); 
    padding: 25px; 
    border-radius: 15px; 
    box-shadow: 0 2px 15px var(--shadow);
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }
  .post:hover { 
    transform: translateY(-3px);
    box-shadow: 0 8px 25px var(--shadow-hover);
    border-color: var(--accent);
  }
  .post h2 { margin: 0 0 12px; }
  .post h2 a { 
    text-decoration: none; 
    color: var(--text-primary); 
    font-size: 1.4rem;
    transition: color 0.3s;
  }
  .post h2 a:hover { color: var(--accent); }
  .post .meta { 
    color: var(--text-muted); 
    font-size: 0.9rem; 
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .form-page { 
    max-width: 450px; 
    margin: 60px auto; 
    padding: 40px;
    background: var(--bg-secondary);
    border-radius: 20px;
    box-shadow: 0 10px 40px var(--shadow);
  }
  .form-page h1 { 
    text-align: center; 
    margin-bottom: 30px; 
    color: var(--text-primary);
    font-size: 1.8rem;
  }
  .form-page input { 
    width: 100%; 
    padding: 14px 18px; 
    margin-bottom: 15px; 
    border: 2px solid var(--border);
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s;
    background: var(--bg-secondary);
    color: var(--text-primary);
  }
  .form-page input:focus { 
    outline: none; 
    border-color: var(--accent);
  }
  .form-page button { 
    width: 100%; 
    padding: 14px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  .form-page button:hover { background: var(--accent-hover); }
  .form-page p { 
    text-align: center; 
    margin-top: 20px; 
    color: var(--text-secondary);
  }
  .form-page p a { color: var(--accent); text-decoration: none; }
  .form-page p a:hover { text-decoration: underline; }
  textarea { 
    width: 100%; 
    padding: 14px 18px; 
    border: 2px solid var(--border);
    border-radius: 10px;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    min-height: 250px;
    background: var(--bg-secondary);
    color: var(--text-primary);
  }
  textarea:focus { outline: none; border-color: var(--accent); }
  .content-page { 
    background: var(--bg-secondary);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 40px var(--shadow);
    margin-top: 20px;
  }
  .content-page h1 { 
    color: var(--text-primary); 
    margin-bottom: 15px;
    font-size: 2rem;
  }
  .content-page .meta { 
    color: var(--text-muted); 
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
  }
  .content-page .content { 
    line-height: 1.9; 
    color: var(--text-secondary);
    font-size: 1.05rem;
  }
  .content-page .content p { margin-bottom: 15px; }
  .content-page .content img { max-width: 100%; border-radius: 10px; margin: 15px 0; }
  .content-page .content code {
    background: var(--code-bg);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: "Fira Code", monospace;
  }
  .content-page hr { border: none; border-top: 1px solid var(--border); margin: 25px 0; }
  .back-link { 
    display: inline-block; 
    margin-top: 25px; 
    color: var(--accent); 
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s;
  }
  .back-link:hover { transform: translateX(-5px); }
  .welcome { 
    background: linear-gradient(135deg, var(--accent), var(--accent-hover));
    color: white;
    padding: 15px 25px;
    border-radius: 30px;
    display: inline-block;
    margin-bottom: 20px;
  }
  .empty { 
    text-align: center; 
    color: var(--text-muted); 
    padding: 60px 0;
    font-size: 1.1rem;
  }
  .checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    padding: 15px;
    background: var(--code-bg);
    border-radius: 10px;
  }
  .checkbox-wrapper input {
    width: auto;
    margin: 0;
  }
  .checkbox-wrapper label {
    color: var(--text-secondary);
    cursor: pointer;
  }
  .private-badge {
    background: var(--text-muted);
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    margin-left: 10px;
  }
  .public-badge {
    background: #27ae60;
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    margin-left: 10px;
  }
  .section-title {
    margin: 30px 0 20px;
    color: var(--text-primary);
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title::before {
    content: "";
    width: 4px;
    height: 24px;
    background: var(--accent);
    border-radius: 2px;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .post, .content-page, .form-page {
    animation: fadeIn 0.5s ease forwards;
  }
  .post:nth-child(1) { animation-delay: 0.1s; }
  .post:nth-child(2) { animation-delay: 0.2s; }
  .post:nth-child(3) { animation-delay: 0.3s; }
  .post:nth-child(4) { animation-delay: 0.4s; }
  .post:nth-child(5) { animation-delay: 0.5s; }
</style>
<script>
  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }
  (function() {
    const saved = localStorage.getItem('theme') || 'light';
    if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  })();
</script>`;

app.get('/', (req, res) => {
  const db = getDb();
  const publicPosts = db.exec('SELECT p.id, p.title, p.created_at, u.username, p.is_public FROM posts p JOIN users u ON p.user_id = u.id WHERE COALESCE(p.is_public, 0) = 1 ORDER BY p.created_at DESC')[0];
  
  let personalPosts = null;
  if (req.session.userId) {
    const result = db.exec('SELECT p.id, p.title, p.created_at, u.username, p.is_public FROM posts p JOIN users u ON p.user_id = u.id WHERE p.user_id = ? ORDER BY p.created_at DESC', [req.session.userId]);
    personalPosts = result[0];
  }
  
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的網誌</title>
  ${styles}
</head>
<body>
  <button class="theme-toggle" onclick="toggleTheme()" title="切換主題">🌙</button>
  <div class="container">
    <header>
      <h1>我的網誌</h1>
      <p>分享想法與故事</p>
      <div class="nav">`;
  
  if (req.session.userId) {
    html += `<span class="welcome">歡迎, ${escapeHtml(req.session.username)}</span>
        <a href="/new" class="btn">寫新文章</a>
        <a href="/logout" class="btn btn-secondary">登出</a>`;
  } else {
    html += `<a href="/login" class="btn">登入</a>
        <a href="/register" class="btn btn-secondary">註冊</a>`;
  }
  
  html += `</div>
    </header>`;
  
  if (req.session.userId && personalPosts && personalPosts.values.length > 0) {
    html += `<h2 class="section-title">📁 我的私人貼文</h2>
    <div class="posts">`;
    personalPosts.values.forEach(row => {
      const badge = row[4] ? '<span class="public-badge">已公開</span>' : '<span class="private-badge">私人</span>';
      html += `<div class="post">
        <h2><a href="/post/${row[0]}">${escapeHtml(row[1])}</a>${badge}</h2>
        <div class="meta">${new Date(row[2]).toLocaleString('zh-TW')}</div>
      </div>`;
    });
    html += '</div>';
  }
  
  html += `<h2 class="section-title">🌍 公共貼文區</h2>`;
  
  if (!publicPosts || publicPosts.values.length === 0) {
    html += '<div class="empty">尚無公開貼文</div>';
  } else {
    html += '<div class="posts">';
    publicPosts.values.forEach(row => {
      html += `<div class="post">
        <h2><a href="/post/${row[0]}">${escapeHtml(row[1])}</a></h2>
        <div class="meta">${new Date(row[2]).toLocaleString('zh-TW')} - ${escapeHtml(row[3])}</div>
      </div>`;
    });
    html += '</div>';
  }
  html += '</div></body></html>';
  res.send(html);
});

app.get('/register', (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>註冊 - 網誌</title>
  ${styles}
</head>
<body>
  <button class="theme-toggle" onclick="toggleTheme()" title="切換主題">🌙</button>
  <div class="form-page">
    <h1>建立帳號</h1>
    <form method="post" action="/register">
      <input type="text" name="username" placeholder="用戶名" required>
      <input type="password" name="password" placeholder="密碼" required>
      <button type="submit">註冊</button>
    </form>
    <p>已有帳號? <a href="/login">登入</a></p>
  </div>
</body>
</html>`);
});

app.post('/register', async (req, res) => {
  const db = getDb();
  const { username, password } = req.body;
  
  const existing = db.exec('SELECT id FROM users WHERE username = ?', [username]);
  if (existing[0] && existing[0].values.length > 0) {
    return res.send('用戶名已存在 <a href="/register">返回</a>');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
  saveDb();
  
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>登入 - 網誌</title>
  ${styles}
</head>
<body>
  <button class="theme-toggle" onclick="toggleTheme()" title="切換主題">🌙</button>
  <div class="form-page">
    <h1>歡迎回來</h1>
    <form method="post" action="/login">
      <input type="text" name="username" placeholder="用戶名" required>
      <input type="password" name="password" placeholder="密碼" required>
      <button type="submit">登入</button>
    </form>
    <p>沒有帳號? <a href="/register">註冊</a></p>
  </div>
</body>
</html>`);
});

app.post('/login', async (req, res) => {
  const db = getDb();
  const { username, password } = req.body;
  
  const result = db.exec('SELECT id, password, username FROM users WHERE username = ?', [username]);
  if (!result[0] || result[0].values.length === 0) {
    return res.send('用戶名或密碼錯誤 <a href="/login">返回</a>');
  }
  
  const user = result[0].values[0];
  const valid = await bcrypt.compare(password, user[1]);
  
  if (!valid) {
    return res.send('用戶名或密碼錯誤 <a href="/login">返回</a>');
  }
  
  req.session.userId = user[0];
  req.session.username = user[2];
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/public', (req, res) => {
  const db = getDb();
  const publicPosts = db.exec('SELECT p.id, p.title, p.created_at, u.username, p.is_public FROM posts p JOIN users u ON p.user_id = u.id WHERE COALESCE(p.is_public, 0) = 1 ORDER BY p.created_at DESC')[0];
  
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>公共貼文區 - 網誌</title>
  ${styles}
</head>
<body>
  <button class="theme-toggle" onclick="toggleTheme()" title="切換主題">🌙</button>
  <div class="container">
    <header>
      <h1>🌍 公共貼文區</h1>
      <p>瀏覽所有公開的貼文</p>
      <div class="nav">
        <a href="/" class="btn">回首頁</a>
      </div>
    </header>`;
  
  if (!publicPosts || publicPosts.values.length === 0) {
    html += '<div class="empty">尚無公開貼文</div>';
  } else {
    html += '<div class="posts">';
    publicPosts.values.forEach(row => {
      html += `<div class="post">
        <h2><a href="/post/${row[0]}">${escapeHtml(row[1])}</a></h2>
        <div class="meta">${new Date(row[2]).toLocaleString('zh-TW')} - ${escapeHtml(row[3])}</div>
      </div>`;
    });
    html += '</div>';
  }
  html += '</div></body></html>';
  res.send(html);
});

app.get('/new', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>寫新文章 - 網誌</title>
  ${styles}
</head>
<body>
  <button class="theme-toggle" onclick="toggleTheme()" title="切換主題">🌙</button>
  <div class="container">
    <div class="form-page" style="max-width: 100%;">
      <h1>寫新文章</h1>
      <form method="post" action="/posts">
        <input type="text" name="title" placeholder="標題" required style="padding: 14px 18px; border: 2px solid var(--border); border-radius: 10px; font-size: 1rem; margin-bottom: 15px; background: var(--bg-secondary); color: var(--text-primary);">
        <textarea name="content" placeholder="內容 (支援 Markdown)" required></textarea>
        <div class="checkbox-wrapper">
          <input type="checkbox" name="is_public" id="is_public" value="1">
          <label for="is_public">發布到公共貼文區 (其他用户可見)</label>
        </div>
        <button type="submit" style="margin-top: 15px;">發布文章</button>
      </form>
      <p style="text-align: center; margin-top: 20px;"><a href="/">返回</a></p>
    </div>
  </div>
</body>
</html>`);
});

app.post('/posts', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const db = getDb();
  const { title, content, is_public } = req.body;
  const now = new Date().toISOString();
  const isPublic = is_public ? 1 : 0;
  db.run('INSERT INTO posts (title, content, user_id, is_public, created_at) VALUES (?, ?, ?, ?, ?)', [title, content, req.session.userId, isPublic, now]);
  saveDb();
  res.redirect('/');
});

app.get('/post/:id', (req, res) => {
  const db = getDb();
  const result = db.exec('SELECT p.title, p.content, p.created_at, p.is_public, u.username, p.user_id FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = ?', [parseInt(req.params.id)]);
  if (!result[0] || result[0].values.length === 0) {
    return res.status(404).send('找不到文章');
  }
  const row = result[0].values[0];
  const isPrivate = row[3] === 0;
  const isOwner = req.session.userId === row[5];
  
  if (isPrivate && !isOwner) {
    return res.status(404).send('找不到文章');
  }
  
  const htmlContent = marked(row[1]);
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(row[0])} - 網誌</title>
  ${styles}
</head>
<body>
  <button class="theme-toggle" onclick="toggleTheme()" title="切換主題">🌙</button>
  <div class="container">
    <div class="content-page">
      <h1>${escapeHtml(row[0])}${isPrivate ? '<span class="private-badge">私人</span>' : '<span class="public-badge">公開</span>'}</h1>
      <div class="meta">${new Date(row[2]).toLocaleString('zh-TW')} - ${escapeHtml(row[4])}</div>
      <hr>
      <div class="content">${htmlContent}</div>
      <a href="/" class="back-link">← 返回</a>
    </div>
  </div>
</body>
</html>`);
});

initDb().then(() => {
  app.listen(3000, () => {
    console.log('網誌系統已啟動: http://localhost:3000');
  });
});