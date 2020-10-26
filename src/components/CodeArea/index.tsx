import React, {FunctionComponent, useEffect, useState, useRef} from 'react';
import Codemirror, {Editor} from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import {CodeMirrorStyle} from './styles';
import {queryTheme, Theme, ThemeKey} from '../Theme';

interface CodeAreaProps {
    code: string
    themeKey: ThemeKey;
    applyTheme: (theme: Theme) => void;
}

const CodeAreaFn: FunctionComponent<CodeAreaProps> = ({themeKey, code, applyTheme}) => {
    const codeRef = useRef<HTMLDivElement>(null);
    const [codemirror, setCodemirror] = useState<Editor>();

    useEffect(() => {
        if (codeRef.current) {
            const current = codeRef.current;
            if (codemirror) {
                codemirror.setOption('theme', themeKey);
                codemirror.setOption('value', code);
            } else {
                const _codemirror_ = Codemirror(current, {
                    value: code,
                    mode: 'javascript',
                    theme: themeKey,
                });
                _codemirror_.setSize(null, 'auto');
                setCodemirror(_codemirror_);
            }
            applyTheme(queryTheme(current));
        }
    }, [applyTheme, themeKey, code, codemirror]);

    return <><CodeMirrorStyle/>
        <div ref={codeRef}/>
    </>;
};

export default CodeAreaFn;