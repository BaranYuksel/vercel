import { readFileSync } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';
import { DomainNotFound, InvalidDomain, isAPIError } from '../errors-ts';
import type { Response } from 'node-fetch';
import type Client from '../client';

interface JSONResponse {
  recordIds: string[];
}

export default async function importZonefile(
  client: Client,
  contextName: string,
  domain: string,
  zonefilePath: string,
) {
  client.output.spinner(
    `Importing Zone file for domain ${domain} under ${chalk.bold(contextName)}`,
  );
  const zonefile = readFileSync(resolve(zonefilePath), 'utf8');

  try {
    const res = await client.fetch<Response>(
      `/v3/domains/${encodeURIComponent(domain)}/records`,
      {
        headers: { 'Content-Type': 'text/dns' },
        body: zonefile,
        method: 'PUT',
        json: false,
      },
    );

    const { recordIds } = (await res.json()) as JSONResponse;
    return recordIds;
  } catch (err: unknown) {
    if (isAPIError(err)) {
      if (err.code === 'not_found') {
        return new DomainNotFound(domain, contextName);
      }

      if (err.code === 'invalid_domain') {
        return new InvalidDomain(domain);
      }
    }

    throw err;
  }
}
