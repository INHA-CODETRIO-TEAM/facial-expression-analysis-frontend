import styled from "styled-components";

interface Props {
  image: string | undefined;
}

function UserImage({ image }: Props) {
  return (
    <FlexColumn>
      <Figure>
        <Image src={image} alt="강아지사진" />
        <FigCaption>나의 반응</FigCaption>
      </Figure>
    </FlexColumn>
  );
}

export default UserImage;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 50%;
`;

const Image = styled.img`
  width: 100%;
`;

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FigCaption = styled.figcaption`
  margin-top: 5px;
  color: #cecccc;
  font-size: small;
`;
