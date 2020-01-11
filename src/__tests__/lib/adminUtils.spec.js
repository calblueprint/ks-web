import { updateProjectGroupOwners } from '../../lib/adminUtils';

const testGroupId = 'recxJehaSlKk8IiS9';
const testAdminId = 'reckNsjHnv0IpwN5M';
const testOwnerIdToAddBack = 'recu2EuvrrPYYG0T4';

// Calls updateProjectGroupOwners on the testGroupId and testAdminId
// verifies that the updateProjectGroupOwners returns the testGroupId
// TODO: doesn't check that Project Groups is actually changed on Airtable
describe('updateProjectGroupOwners function', () => {
  test('expect true', async () => {
    let res = await updateProjectGroupOwners(testGroupId, [testAdminId]);
    expect(res).toStrictEqual(testGroupId);
    res = await updateProjectGroupOwners(testGroupId, [
      testAdminId,
      testOwnerIdToAddBack
    ]);
    expect(res).toStrictEqual(testGroupId);
  });
});