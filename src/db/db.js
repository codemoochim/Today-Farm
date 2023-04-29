import mysql from "mysql2";

class DB {
  constructor({ host, user, password, database }) {
    this.pool = mysql.createPool({
      host,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
    });
    this.promisePool = this.pool.promise();
  }

  async insertData({ id, temp, humid, lux, solid, time }) {
    const sql = `INSERT INTO datas (id, temp, humid, lux, solid, time) value (?,?,?,?,?,?)`;
    const [rows] = await this.promisePool.execute(sql, [id, temp, humid, lux, solid, time]);
    return rows;
  }

  async getLatestData() {
    // 데이터 조회
    const sql =
      "select * from datas where deviceId IN(select MAX(deviceId) deviceId from `smart_farm`.datas group by deviceId)";
    const [rows] = await this.promisePool.query(sql);
    return rows;
  }

  async getDevices() {
    // 디바이스 조회
    const sql = "select * from devices;";
    const [rows] = await this.promisePool.query(sql);
    return rows;
  }

  async getOneDevice(deviceId) {
    // 디바이스 조회
    const sql = "select * from devices where deviceId=?;";
    const [rows] = await this.promisePool.query(sql, [deviceId]);
    return rows;
  }

  async getData(deviceId, start, end) {
    const sql = "select * from datas where deviceId=? and (created_at BETWEEN ? AND ? );";
    const [rows] = await this.promisePool.query(sql, [deviceId, start, end]);
    return rows;
  }
}

export default DB;
