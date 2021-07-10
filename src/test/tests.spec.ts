import { setupFS } from './helpers/setup-fs';
import { SnippetsBuilder } from '..';
import { join } from 'path';

describe('test', () => {
  it('should generate a snippet file', async () => {
    const fs = setupFS();
    const builder = new SnippetsBuilder({
      fs,
      srcDir: join(__dirname, 'src'),
    });
    await builder.build();
    expect(fs.files).toMatchSnapshot();
  })
});
