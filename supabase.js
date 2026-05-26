import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://bwpyhnqowjukwoxbxbnk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cHlobnFvd2p1a3dveGJ4Ym5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NTY0OTUsImV4cCI6MjA4NzIzMjQ5NX0.q7faVibjHxjSq3KxVKv9fPg6n2vsArNB03JrT3lJ8Xs'
);

export default supabase;
