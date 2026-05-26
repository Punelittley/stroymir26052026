const { createClient } = require('@supabase/supabase-js');
const sb = createClient('https://bwpyhnqowjukwoxbxbnk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cHlobnFvd2p1a3dveGJ4Ym5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NTY0OTUsImV4cCI6MjA4NzIzMjQ5NX0.q7faVibjHxjSq3KxVKv9fPg6n2vsArNB03JrT3lJ8Xs');

async function run() {
    const { data, error } = await sb.rpc('exec_sql', { 
        query: `
            CREATE TABLE IF NOT EXISTS promocodes (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                code TEXT UNIQUE NOT NULL,
                discount_percent INT NOT NULL,
                expires_at TIMESTAMPTZ NOT NULL,
                usage_limit INT DEFAULT 0,
                used_count INT DEFAULT 0,
                created_at TIMESTAMPTZ DEFAULT now()
            );
            ALTER TABLE promocodes ENABLE ROW LEVEL SECURITY;
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view active promocodes' AND tablename = 'promocodes') THEN
                    CREATE POLICY "Public can view active promocodes" ON promocodes FOR SELECT USING (true);
                END IF;
                IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage promocodes' AND tablename = 'promocodes') THEN
                    CREATE POLICY "Admins can manage promocodes" ON promocodes FOR ALL USING (true);
                END IF;
            END
            $$;
        ` 
    });
    if (error) console.error(error);
    else console.log('Promocodes table ready!');
}
run();
