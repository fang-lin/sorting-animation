import React, {Component, ReactNode, RefObject} from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/the-matrix.css';

interface CodeAreaProps {
    code: string
}

export default class CodeArea extends Component<CodeAreaProps> {
    codeRef: RefObject<HTMLDivElement>;

    constructor(props: CodeAreaProps) {
        super(props);
        this.codeRef = React.createRef();
    }

    componentDidMount(): void {
        if (this.codeRef.current) {
            const codemirror = Codemirror(this.codeRef.current, {
                value: this.props.code,
                mode: 'javascript',
                theme: 'the-matrix'
            });
            setTimeout(() => {
                codemirror.refresh();
            }, 100);
        }
    }

    render(): ReactNode {
        return <div ref={this.codeRef}/>;
    }
}

export const name = 'Binary Insert';