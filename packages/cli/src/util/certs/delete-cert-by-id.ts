import type Client from '../client';
import type { Output } from '../output';

export default async function deleteCertById(
  output: Output,
  client: Client,
  id: string,
) {
  return client.fetch(`/v5/now/certs/${id}`, {
    method: 'DELETE',
  });
}
