'use client'

import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

const OnlineJSCompiler: React.FC = () => {
  const [code, setCode] = useState('// Write your JavaScript code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const runCode = () => {
    setOutput('');
    const oldConsoleLog = console.log;
    const logs: string[] = [];

    console.log = (...args: any[]) => {
      logs.push(args.map(arg => JSON.stringify(arg)).join(' '));
    };

    try {
      // eslint-disable-next-line no-new-func
      new Function(code)();
      setOutput(logs.join('\n'));
    } catch (error) {
      handleError(error as Error);
    } finally {
      console.log = oldConsoleLog;
    }
  };

  const handleError = (error: Error) => {
    const errorMessage = error.message;
    
    let lineNumber = -1;
    let columnNumber = -1;

    // Try to extract line and column numbers from the error stack
    const match = error.stack?.match(/<anonymous>:(\d+):(\d+)/);
    if (match) {
      lineNumber = parseInt(match[1], 10) - 1;
      columnNumber = parseInt(match[2], 10) - 1;
    }

    // Set simplified error output
    setOutput(`Error on line ${lineNumber + 1}, column ${columnNumber + 1}:\n${errorMessage}`);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        runCode();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-1/2 p-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold text-gray-800">JS Compiler</h1>
            <div className="flex space-x-2">
              <button
                onClick={runCode}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
              >
                <Play className="w-4 h-4 mr-1" />
                Run
              </button>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-2 font-mono text-sm bg-white text-gray-800 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            spellCheck="false"
          />
        </div>
        <div className="w-1/2 p-4 flex flex-col">
          <div className="flex-1 p-2 font-mono text-sm bg-white text-gray-800 rounded-lg overflow-auto border border-gray-300">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineJSCompiler;