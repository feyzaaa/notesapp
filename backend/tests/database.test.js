const pool = require('../src/database');

describe('Database Connection', () => {
  afterAll(async () => {
    if (typeof pool.end === 'function') {
      await pool.end(); // Verbindung beenden
    }
  });

  it('should connect to the database successfully', async () => {
    try {
      const connection = await pool.getConnection();
      expect(connection).toBeDefined(); // Verbindung prüfen
      await connection.ping(); // Verbindung aktiv prüfen
      connection.release(); // Verbindung freigeben
    } catch (error) {
      console.error('Database connection failed:', error.message);
      throw error; // Test fehlschlagen lassen
    }
  });
});
