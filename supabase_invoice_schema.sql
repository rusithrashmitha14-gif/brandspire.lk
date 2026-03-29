-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL UNIQUE,
  date DATE DEFAULT CURRENT_DATE,
  currency TEXT DEFAULT 'USD',
  discount_total NUMERIC DEFAULT 0,
  final_price NUMERIC NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, sent, paid
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoice Items Table
CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  discount_percent NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL
);

-- Settings Table (for Bank Details and other configs)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB
);

-- Insert Initial Bank Details template if not exists
INSERT INTO settings (key, value) 
VALUES ('bank_details', '{"bank_name": "Your Bank Name", "account_name": "Brandspire.lk", "account_number": "0000000000", "branch": "Main Branch", "swift_code": "SWIFT123"}')
ON CONFLICT (key) DO NOTHING;
