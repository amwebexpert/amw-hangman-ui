import React from 'react';
import { useDictionary } from '../../services/dictionary-hook';
import Splash from './Splash';

const ApplicationLoader: React.FC<React.ReactNode> = ({ children }) => {
    const [progress, setProgress] = React.useState(10);
    const [ready, setReady] = React.useState(false);
    const { dictionary } = useDictionary();

    React.useEffect(() => {
        let value = 50;

        value += dictionary.entries.length > 0 ? 50 : 0;

        setProgress(value);
    }, [dictionary]);

    React.useEffect(() => {
        if (dictionary.entries.length > 0) {
            console.log(`Dictionary loaded with ${dictionary.categories.length} categories`);
            setTimeout(() => setReady(true), 1000);
        }
    }, [dictionary]);

    if (!ready) {
        return <Splash progress={progress} />
    }

    return (
        <>
            {children}
        </>
    );
}

export default ApplicationLoader;

