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
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
    min-height: 100vh;
    color: #333;
  }
  .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
  header { 
    text-align: center; 
    margin-bottom: 40px;
    padding: 40px 0;
  }
  header h1 { 
    font-size: 2.5rem; 
    color: #2c3e50; 
    margin-bottom: 10px;
    font-weight: 700;
  }
  header p { color: #7f8c8d; font-size: 1.1rem; }
  .nav { 
    display: flex; 
    gap: 15px; 
    justify-content: center; 
    margin-top: 20px;
  }
  .btn { 
    background: #3498db; 
    color: white; 
    padding: 12px 24px; 
    text-decoration: none; 
    border-radius: 25px;
    transition: all 0.3s ease;
    font-weight: 500;
    display: inline-block;
  }
  .btn:hover { 
    background: #2980b9; 
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }
  .btn-secondary { background: #95a5a6; }
  .btn-secondary:hover { background: #7f8c8d; }
  .posts { display: flex; flex-direction: column; gap: 20px; }
  .post { 
    background: white; 
    padding: 25px; 
    border-radius: 15px; 
    box-shadow: 0 2px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .post:hover { 
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  }
  .post h2 { margin: 0 0 12px; }
  .post h2 a { 
    text-decoration: none; 
    color: #2c3e50; 
    font-size: 1.4rem;
    transition: color 0.3s;
  }
  .post h2 a:hover { color: #3498db; }
  .post .meta { 
    color: #95a5a6; 
    font-size: 0.9rem; 
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .post .meta::before {
    content: "👤";
    font-size: 0.85rem;
  }
  .form-page { 
    max-width: 450px; 
    margin: 60px auto; 
    padding: 40px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  }
  .form-page h1 { 
    text-align: center; 
    margin-bottom: 30px; 
    color: #2c3e50;
    font-size: 1.8rem;
  }
  .form-page input { 
    width: 100%; 
    padding: 14px 18px; 
    margin-bottom: 15px; 
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  .form-page input:focus { 
    outline: none; 
    border-color: #3498db;
  }
  .form-page button { 
    width: 100%; 
    padding: 14px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
  }
  .form-page button:hover { background: #2980b9; }
  .form-page p { 
    text-align: center; 
    margin-top: 20px; 
    color: #7f8c8d;
  }
  .form-page p a { color: #3498db; text-decoration: none; }
  .form-page p a:hover { text-decoration: underline; }
  textarea { 
    width: 100%; 
    padding: 14px 18px; 
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    min-height: 250px;
  }
  textarea:focus { outline: none; border-color: #3498db; }
  .content-page { 
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    margin-top: 20px;
  }
  .content-page h1 { 
    color: #2c3e50; 
    margin-bottom: 15px;
    font-size: 2rem;
  }
  .content-page .meta { 
    color: #95a5a6; 
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ecf0f1;
  }
  .content-page .content { 
    line-height: 1.9; 
    color: #34495e;
    font-size: 1.05rem;
  }
  .content-page .content p { margin-bottom: 15px; }
  .content-page .content img { max-width: 100%; border-radius: 10px; margin: 15px 0; }
  .content-page .content code {
    background: #f8f9fa;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: "Fira Code", monospace;
  }
  .content-page hr { border: none; border-top: 1px solid #ecf0f1; margin: 25px 0; }
  .back-link { 
    display: inline-block; 
    margin-top: 25px; 
    color: #3498db; 
    text-decoration: none;
    font-weight: 500;
  }
  .back-link:hover { text-decoration: underline; }
  .welcome { 
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    padding: 15px 25px;
    border-radius: 30px;
    display: inline-block;
    margin-bottom: 20px;
  }
  .empty { 
    text-align: center; 
    color: #95a5a6; 
    padding: 60px 0;
    font-size: 1.1rem;
  }
  .tabs { 
    display: flex; 
    gap: 10px; 
    margin-bottom: 30px;
    justify-content: center;
  }
  .tab {
    padding: 12px 24px;
    background: white;
    border-radius: 25px;
    text-decoration: none;
    color: #7f8c8d;
    transition: all 0.3s;
    font-weight: 500;
  }
  .tab.active {
    background: #3498db;
    color: white;
  }
  .tab:hover:not(.active) {
    background: #ecf0f1;
  }
  .checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
  }
  .checkbox-wrapper input {
    width: auto;
    margin: 0;
  }
  .checkbox-wrapper label {
    color: #34495e;
    cursor: pointer;
  }
  .private-badge {
    background: #95a5a6;
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
</style>`;

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
    html += `<h2 style="margin: 30px 0 20px; color: #2c3e50;">📁 我的私人貼文</h2>
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
  
  html += `<h2 style="margin: 30px 0 20px; color: #2c3e50;">🌍 公共貼文區</h2>`;
  
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
  <div class="container">
    <div class="form-page" style="max-width: 100%;">
      <h1>寫新文章</h1>
      <form method="post" action="/posts">
        <input type="text" name="title" placeholder="標題" required style="padding: 14px 18px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1rem; margin-bottom: 15px;">
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