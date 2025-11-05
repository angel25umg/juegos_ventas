"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add CONVERTIDO to enum_carritos_estado if missing
    await queryInterface.sequelize.query(`DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid
        WHERE t.typname = 'enum_carritos_estado' AND e.enumlabel = 'CONVERTIDO'
      ) THEN
        ALTER TYPE enum_carritos_estado ADD VALUE 'CONVERTIDO';
      END IF;
    END $$;`);

    // Add PAGADO to enum_pedidos_estado if missing
    await queryInterface.sequelize.query(`DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid
        WHERE t.typname = 'enum_pedidos_estado' AND e.enumlabel = 'PAGADO'
      ) THEN
        ALTER TYPE enum_pedidos_estado ADD VALUE 'PAGADO';
      END IF;
    END $$;`);
  },

  down: async (queryInterface, Sequelize) => {
    // Removing enum values from a Postgres enum type is not trivial and may
    // require creating a new type and migrating data. Leave down as no-op so
    // that rollback is explicit and manual if needed.
    return Promise.resolve();
  }
};
