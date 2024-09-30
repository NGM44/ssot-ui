'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Play, Code, Maximize2, Minimize2 } from 'lucide-react';
import Editor, { Monaco, useMonaco } from '@monaco-editor/react';

const OnlineJSCompiler: React.FC = () => {
  const [code, setCode] = useState('// Write your JavaScript code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const editorRef = useRef<any>(null);
  const monaco = useMonaco();

  useEffect(() => setMounted(true), []);

  const runCode = () => {
    setOutput('');
    const oldConsoleLog = console.log;
    const logs: string[] = [];

    console.log = (...args: any[]) => {
      logs.push(args.map(arg => JSON.stringify(arg)).join(' '));
    };

    try {
      // Clear previous decorations
      editorRef.current.deltaDecorations([], []);
      
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

    // Highlight the error in the editor
    if (monaco && lineNumber >= 0 && columnNumber >= 0) {
      const decorations = [
        {
          range: new monaco.Range(lineNumber, columnNumber, lineNumber, columnNumber + 1),
          options: {
            inlineClassName: 'errorHighlight',
            hoverMessage: { value: errorMessage }
          }
        }
      ];
      editorRef.current.deltaDecorations([], decorations);
    }

    // Set simplified error output
    setOutput(`Error on line ${lineNumber + 1}, column ${columnNumber + 1}:\n${errorMessage}`);
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
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

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    
    // Add custom intellisense for built-in JavaScript functions
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types']
    });

    // Add extra libraries
    monaco.languages.typescript.javascriptDefaults.addExtraLib(`
      declare class Console {
        log(...data: any[]): void;
        info(...data: any[]): void;
        warn(...data: any[]): void;
        error(...data: any[]): void;
        // Add more console methods as needed
      }
      declare var console: Console;
    `, 'ts:console.d.ts');

    // Add custom CSS for error highlighting
    const style = document.createElement('style');
    style.textContent = `
      .errorHighlight {
        text-decoration: wavy underline red;
        text-decoration-skip-ink: none;
      }
    `;
    document.head.appendChild(style);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex flex-1 overflow-hidden">
        <div className={`flex flex-col ${isFullScreen ? 'w-full' : 'w-1/2'} p-4 transition-all duration-300 ease-in-out`}>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">JS Compiler</h1>
            <div className="flex space-x-2">
              <button
                onClick={runCode}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
              >
                <Play className="w-4 h-4 mr-1" />
                Run
              </button>
              <button
                onClick={formatCode}
                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Format Code"
              >
                <Code className="w-5 h-5" />
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={toggleFullScreen}
                className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle Fullscreen"
              >
                {isFullScreen ? (
                  <Minimize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
            onMount={handleEditorDidMount}
          />
        </div>
        {!isFullScreen && (
          <div className="w-1/2 p-4 flex flex-col">
            <div className="flex-1 p-2 font-mono text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-green-400 rounded-lg overflow-auto border border-gray-300 dark:border-gray-600">
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineJSCompiler;