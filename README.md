# CodeSlayers
This is the repo for the codeslayers project for runnibng the error codes

## Supabase troubleshooting for `profiles`

The app expects these environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If either is missing, Supabase client initialization will fail.

### SQL for Row Level Security (RLS) on `profiles`

Run the following in Supabase SQL Editor.

```sql
-- Ensure RLS is enabled
alter table public.profiles enable row level security;

-- For authenticated users: allow reading only their own profile
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

-- For authenticated users: allow inserting only their own profile
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);
```

If you are not using auth and need anonymous access temporarily:

```sql
-- WARNING: broad anonymous access, only use for temporary debugging
create policy "profiles_select_anon"
on public.profiles
for select
to anon
using (true);

create policy "profiles_insert_anon"
on public.profiles
for insert
to anon
with check (true);
```
