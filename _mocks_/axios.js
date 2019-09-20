export default {
  $get: jest.fn(mockAxiosGetResult => Promise.resolve(mockAxiosGetResult)),
  $post: jest.fn(mockAxiosGetResult => Promise.resolve(mockAxiosGetResult)),
  $put: jest.fn(mockAxiosGetResult => Promise.resolve(mockAxiosGetResult)),
  $delete: jest.fn(mockAxiosGetResult => Promise.resolve(mockAxiosGetResult))
}
