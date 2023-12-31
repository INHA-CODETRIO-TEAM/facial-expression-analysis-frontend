import { ResultType } from "@/global/type";
import customAxios from "..";

interface Variables {
  ids: number[] | undefined;
  setResult: React.Dispatch<React.SetStateAction<ResultType[]>>;
}

function getResults({ ids, setResult }: Variables) {
  customAxios
    .post(`api/test/result`, JSON.stringify({ ids: ids }), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const data = res.data.results;
      setResult(
        data.map((item: ResultType) => ({
          faceImg: `data:image/jpeg;base64,${item.faceImg}`,
          sampleImg: `data:image/jpeg;base64,${item.sampleImg}`,
          result: {
            happy: item.result.happy,
            surprise: item.result.surprise,
            angry: item.result.angry,
            fear: item.result.fear,
            sad: item.result.sad,
            neutral: item.result.neutral,
          },
          feedback: {
            happy: item.feedback.happy,
            surprise: item.feedback.surprise,
            angry: item.feedback.angry,
            fear: item.feedback.fear,
            sad: item.feedback.sad,
            neutral: item.feedback.neutral,
          },
          deviation: item.deviation,
        }))
      );
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

export default getResults;
