create table users (
  id uuid primary key default gen_random_uuid(),
  telegram_id bigint unique not null,
  username text,
  avatar_url text,
  wallet text,
  referral_code text unique,
  created_at timestamp default now()
);

create table referrals (
  id serial primary key,
  parent_id uuid references users(id) on delete cascade,
  child_id uuid references users(id) on delete cascade,
  level smallint
);

create table lobbies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  creator_id uuid references users(id),
  max_players int not null,
  prize_pool numeric default 0,
  status text default 'open',
  created_at timestamp default now()
);

create table lobby_participants (
  id serial primary key,
  lobby_id uuid references lobbies(id),
  user_id uuid references users(id),
  amount numeric,
  joined_at timestamp default now()
);

create table transactions (
  id serial primary key,
  user_id uuid references users(id),
  tx_hash text,
  amount numeric,
  type text,
  status text,
  created_at timestamp default now()
);
