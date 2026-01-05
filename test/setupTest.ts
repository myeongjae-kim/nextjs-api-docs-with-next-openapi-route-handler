import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// 테스트를 위한 환경변수 설정은 여기에
vi.stubEnv('TEST_HOST', 'http://localhost:3031');

afterEach(() => {
  cleanup();
});