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

app.get('/', (req, res) => {
  const db = getDb();
  const posts = db.exec('SELECT p.id, p.title, p.created_at, u.username FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC')[0];
  
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>網誌</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    .post { border-bottom: 1px solid #ddd; padding: 20px 0; }
    .post h2 { margin: 0 0 10px; }
    .post a { text-decoration: none; color: #333; }
    .post .date { color: #666; font-size: 14px; }
    .btn { background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin-bottom: 20px; }
    .nav { margin-bottom: 20px; }
    .nav a { margin-right: 15px; color: #666; }
  </style>
</head>
<body>
  <h1>我的網誌</h1>
  <div class="nav">`;
  
  if (req.session.userId) {
    html += `<span>歡迎, ${escapeHtml(req.session.username)}</span>
      <a href="/new">寫新文章</a>
      <a href="/logout">登出</a>`;
  } else {
    html += `<a href="/login">登入</a>
      <a href="/register">註冊</a>`;
  }
  
  html += `</div>`;
  
  if (!posts || posts.values.length === 0) {
    html += '<p>尚無文章</p>';
  } else {
    posts.values.forEach(row => {
      html += `<div class="post">
        <h2><a href="/post/${row[0]}">${escapeHtml(row[1])}</a></h2>
        <div class="date">${new Date(row[2]).toLocaleString('zh-TW')} - ${escapeHtml(row[3])}</div>
      </div>`;
    });
  }
  html += '</body></html>';
  res.send(html);
});

app.get('/register', (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>註冊</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
    input { width: 100%; padding: 10px; margin-bottom: 10px; box-sizing: border-box; }
    button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; width: 100%; }
    a { color: #666; }
  </style>
</head>
<body>
  <h1>註冊</h1>
  <form method="post" action="/register">
    <input type="text" name="username" placeholder="用戶名" required>
    <input type="password" name="password" placeholder="密碼" required>
    <button type="submit">註冊</button>
  </form>
  <p><a href="/login">已有帳號? 登入</a></p>
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
  <title>登入</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
    input { width: 100%; padding: 10px; margin-bottom: 10px; box-sizing: border-box; }
    button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; width: 100%; }
    a { color: #666; }
  </style>
</head>
<body>
  <h1>登入</h1>
  <form method="post" action="/login">
    <input type="text" name="username" placeholder="用戶名" required>
    <input type="password" name="password" placeholder="密碼" required>
    <button type="submit">登入</button>
  </form>
  <p><a href="/register">沒有帳號? 註冊</a></p>
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

app.get('/new', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>寫新文章</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    input, textarea { width: 100%; padding: 10px; margin-bottom: 10px; box-sizing: border-box; }
    textarea { height: 300px; }
    button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    a { color: #666; }
  </style>
</head>
<body>
  <h1>寫新文章</h1>
  <form method="post" action="/posts">
    <input type="text" name="title" placeholder="標題" required>
    <textarea name="content" placeholder="內容 (支援 Markdown)" required></textarea>
    <button type="submit">發布</button>
  </form>
  <p><a href="/">返回</a></p>
</body>
</html>`);
});

app.post('/posts', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  const db = getDb();
  const { title, content } = req.body;
  const now = new Date().toISOString();
  db.run('INSERT INTO posts (title, content, user_id, created_at) VALUES (?, ?, ?, ?)', [title, content, req.session.userId, now]);
  saveDb();
  res.redirect('/');
});

app.get('/post/:id', (req, res) => {
  const db = getDb();
  const result = db.exec('SELECT p.title, p.content, p.created_at, u.username FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = ?', [parseInt(req.params.id)]);
  if (!result[0] || result[0].values.length === 0) {
    return res.status(404).send('找不到文章');
  }
  const row = result[0].values[0];
  const htmlContent = marked(row[1]);
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(row[0])}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    .date { color: #666; font-size: 14px; }
    .content { line-height: 1.8; }
    a { color: #007bff; }
  </style>
</head>
<body>
  <h1>${escapeHtml(row[0])}</h1>
  <div class="date">${new Date(row[2]).toLocaleString('zh-TW')} - ${escapeHtml(row[3])}</div>
  <hr>
  <div class="content">${htmlContent}</div>
  <p><a href="/">返回</a></p>
</body>
</html>`);
});

initDb().then(() => {
  app.listen(3000, () => {
    console.log('網誌系統已啟動: http://localhost:3000');
  });
});