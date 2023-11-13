import styled from "styled-components";

interface props {
  capturedImages: string[];
  step: number;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  sample: {
    sampleImg: string | undefined;
    comment: string | undefined;
  };
}

function TestSample({ setImageLoaded, sample, capturedImages }: props) {
  const handleToImageLoaded = () => {
    setImageLoaded(true);
  };
  if (!sample.comment) return null;
  if (!sample.sampleImg) return null;
  return (
    <FlexColumn $isCapturing={capturedImages.length !== 5}>
      <Comment>{sample.comment}</Comment>
      <Image
        onLoad={handleToImageLoaded}
        src={`${sample.sampleImg}`}
        alt="sampleImage"
      />
    </FlexColumn>
  );
}

export default TestSample;

const FlexColumn = styled.div<{ $isCapturing: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${(props) => (props.$isCapturing ? "1000px" : "500px")};
`;
const Comment = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img``;
