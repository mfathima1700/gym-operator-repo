import '@testing-library/jest-dom';
import 'whatwg-fetch'; // Adds fetch to global scope

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
  (global as any).ResizeObserver = ResizeObserver;

