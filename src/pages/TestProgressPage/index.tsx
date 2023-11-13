import Webcam from "@/components/TestProgresspage/Webcam";
import TestSample from "@/components/TestProgresspage/TestSample";
import styled from "styled-components";
import { useState, useEffect } from "react";
import EmotionTF from "@/components/TestProgresspage/EmotionTF";
import EmotionChoice from "@/components/TestProgresspage/EmotionChoice";
import NextTestButton from "@/components/TestProgresspage/NextTestButton";
import TestResultButton from "@/components/TestProgresspage/TestResultButton";
import { SampleType } from "@/global/type";
import getSamples from "@/apis/getSamples";
import { initialEmotion, initialSample, testSample } from "@/global/data";
import FadeFramerMotion from "@/components/Common/FadeFramerMotion";

interface Props {
  setId: React.Dispatch<React.SetStateAction<number[] | undefined>>;
}

function TestProgressPage({ setId }: Props) {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [emotionTF, setEmotionTF] = useState(true);
  const [detailEmotion, setDetailEmotion] = useState(initialEmotion);
  const [step, setStep] = useState(1);
  const [sample, setSample] = useState<SampleType[]>([initialSample]);

  useEffect(() => {
    setSample(
      testSample.map((item: SampleType) => ({
        id: item.id,
        sampleImg: item.sampleImg,
        comment: item.comment,
      }))
    );
    setId(testSample.map((item: SampleType) => item.id || 0));
  }, []);

  /*
  useEffect(() => {
    getSamples({ setSample, setId });
  }, []);
*/

  return (
    <FadeFramerMotion>
      <FlexCenter $isCenter={capturedImages.length !== 5 || !emotionTF}>
        <TestSample
          capturedImages={capturedImages}
          setImageLoaded={setImageLoaded}
          step={step}
          sample={sample[step - 1]}
        />
        {capturedImages.length === 5 && (
          <EmotionTF
            setEmotionTF={setEmotionTF}
            emotionTF={emotionTF}
            setDetailEmotion={setDetailEmotion}
          />
        )}
        {capturedImages.length === 5 && emotionTF && (
          <EmotionChoice setDetailEmotion={setDetailEmotion} />
        )}
        {capturedImages.length === 5 && step < 3 && (
          <NextTestButton
            id={sample[step - 1].id}
            step={step}
            detailEmotion={detailEmotion}
            capturedImages={capturedImages}
            setStep={setStep}
            setCapturedImages={setCapturedImages}
            setImageLoaded={setImageLoaded}
            setEmotionTF={setEmotionTF}
            setDetailEmotion={setDetailEmotion}
          />
        )}
        {capturedImages.length === 5 && step === 3 && (
          <TestResultButton
            detailEmotion={detailEmotion}
            id={sample[step - 1].id}
            capturedImages={capturedImages}
          />
        )}
        {imageLoaded && <Webcam setCapturedImages={setCapturedImages} />}
      </FlexCenter>
    </FadeFramerMotion>
  );
}

export default TestProgressPage;

const FlexCenter = styled.div<{ $isCenter: boolean }>`
  width: 90%;
  min-height: 100%;
  padding-top: ${(props) => (props.$isCenter ? "0" : "90px")};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;
