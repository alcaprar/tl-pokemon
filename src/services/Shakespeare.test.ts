import axios from 'axios'
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
import Shakespeare from './Shakespeare';

describe('shakespeare service', () => {
  test('should return a translation', async () => {
    const shakespeare = new Shakespeare()
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: {
        success: {total: 1},
        contents: {
          translated: 'Farewell mine sweety baby',
          text: 'Bye my sweety baby',
          translations: 'shakespeare'
        }
      },
      status: 200
    }));
    const response = await shakespeare.translate('Bye my sweety baby')
    
    expect(response).toBe('Farewell mine sweety baby')
  })
})