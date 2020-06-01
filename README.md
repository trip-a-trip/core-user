# core USER

User service — registration, profiling, etc.

## Production

### Release to Trip-a-Trip infrastructure

1. Ensure, all code for release in `master`
2. Run `yarn release` to bump version and create git-tag
3. Run `git push --follow-tags`
4. CircleCI will build release and deliver it to production

## Development

This application uses `yarn@berry`, you don't need to install dependencies, all files include in repo.

1. Start PostgreSQL
2. Copy file `.env.dist` to `.env`
3. Pass PostgreSQL connection params to `.env`
4. Init evolutions-table by `NODE_ENV=development yarn evolutions -i`
5. Apply DB-evolutions by `NODE_ENV=development yarn evolutions`
6. Run application by `yarn dev`

Now, you can find service at (http://localhost:3000)[localhost:3001].
