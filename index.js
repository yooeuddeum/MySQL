const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 연결
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

// 테이블 생성
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`);

    // 데이터 삽입
    let stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    stmt.run("John Doe", "john.doe@example.com");
    stmt.run("Jane Smith", "jane.smith@example.com");
    stmt.finalize();

    // 데이터 조회
    db.each("SELECT id, name, email, created_at FROM users", (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(`${row.id}\t${row.name}\t${row.email}\t${row.created_at}`);
    });
});

// 데이터베이스 연결 종료
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});


//sqlite3.Database를 사용하여 데이터베이스에 연결합니다.

//CREATE TABLE IF NOT EXISTS 구문을 사용하여 users 테이블을 생성합니다.

//INSERT INTO 구문을 사용하여 데이터를 삽입합니다.

//SELECT 구문을 사용하여 데이터를 조회합니다.

//마지막으로 데이터베이스 연결을 종료합니다.

// 추가적으로 명령어 및 기능적인 부분을 찾아보고 코드 구조 해석 해보기★



