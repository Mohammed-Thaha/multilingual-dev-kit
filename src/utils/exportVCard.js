/**
 * Generate and download a vCard (.vcf) file for the user profile.
 * @param {Object} data - profile data
 * @param {string} data.username
 * @param {string} data.headline
 * @param {string} data.bio
 * @param {string} data.github
 * @param {string} data.linkedin
 */
export function exportVCard(data) {
  const fullName = data.username || 'User';
  const organization = data.headline || 'Profession';
  const note = data.bio ? data.bio.replace(/\n/g, '\\n') : '';
  const social = [data.github, data.linkedin].filter(Boolean).join(' | ');

  const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${fullName}\nN:${fullName};;;;\nORG:${organization}\nTITLE:${organization}\nNOTE:${note}\nURL:${social}\nEND:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${fullName}-profile.vcf`;
  a.click();
  URL.revokeObjectURL(a.href);
}
