import { LineWave } from  'react-loader-spinner';

export default function Loading() {
    return (
        <LineWave
            height="100"
            width="100"
            color="#1877f2"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
        />
    );
};