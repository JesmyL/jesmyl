import { useToast } from '#shared/ui/modal';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { WedGuest, WedGuestWillBe } from '../../../../../shared/api/complect/apps/wed/complect/model';
import { WedCleans } from '../Cleans';
import { GuestConversation } from '../guest/complect/GuestConversation';

const weddingText = Array(10)
  .fill(1)
  .map((_, key) => <span key={key}>СВАДЬБА</span>);

const myAnswerSetter = (
  guest: WedGuest,
  will: WedGuestWillBe,
  setGuest: (guest: WedGuest) => void,
  setIsAnswerLoading: (is: boolean) => void,
) => {
  if (guest == null) return undefined;

  return async () => {
    setIsAnswerLoading(true);

    // wedExer.send([
    //   {
    //     action: 'setGuestAnswer',
    //     args: {
    //       guestMi: guest.mi,
    //       text: guest.t?.trim(),
    //       will,
    //       guestName: WedCleans.makeGuestFullName(guest),
    //     },
    //   },
    // ]);
    setTimeout(async () => {
      // const person = await serviceMaster('wed')<WedGuest>('getGuest', guest.mi);
      // if (person?.mi == null) setGuest({ ...guest, w: will });
      // else setGuest(person);
      // setIsAnswerLoading(false);
    }, 1000);
  };
};

export default function WeddingProposition() {
  const params = useParams();
  const weddn = params.weddn;
  const personStr = params.personStr;
  const [isLoading, setIsLoading] = useState(true);
  const regRef = useRef<HTMLDivElement>(null);
  const [guest, setGuest] = useState<WedGuest | null>(null);
  const [toastNode, toast] = useToast();
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = '#fff';
  }, []);

  useEffect(() => {
    if (!personStr) return;

    const guestMi = WedCleans.takeMi(personStr);

    if (guestMi == null) {
      toast('Ссылка не действительна', { mood: 'ko', showTime: 20000 });
      return;
    }

    return hookEffectLine()
      .setTimeout(async () => {
        try {
          // const person = await serviceMaster('wed')<WedGuest>('getGuest', guestMi);
          // if (person?.mi == null) {
          //   toast('Ссылка не действительна', { mood: 'ko', showTime: 20000 });
          //   return;
          // }
          // setGuest(person);
        } catch (error) {
          toast('' + error, { mood: 'ko' });
        }
      }, 100)
      .effect();
  }, [personStr, toast]);

  if (!personStr || !weddn) return null;

  return (
    <>
      <StyledContent className={'wedding-proposition-page' + (isLoading ? ' loading' : '')}>
        {toastNode}
        <StyledStock className="flex column flex-gap">
          <MainImg
            file="main3"
            onLoad={() => setTimeout(setIsLoading, 500, false)}
          />
          <RotBox className="flex column">
            <RotBoxContent>
              <NameText>
                <GuestConversation guest={guest} />
              </NameText>

              <InStockImg file="glad2" />
              <a
                href="https://yandex.ru/maps/-/CDwvFM7x"
                className="address pointer"
              >
                <StockImg
                  file="address1"
                  className="margin-giant-gap-t"
                />
              </a>
            </RotBoxContent>
            <WeddingLine>{weddingText}</WeddingLine>
          </RotBox>

          <InStockImg file="sch" />
          <DressWrapper className="relative">
            <div className="full-width flex center">
              <Vizitka className="flex center column flex-gap">
                <Img
                  file="vizText1"
                  className="vizText"
                />
                <a
                  href="tel:+79789466429"
                  className="vizPhone pointer"
                >
                  <Img file="vizPhone" />
                </a>
                <a
                  href="https://t.me/EvdDenis"
                  className="vizTg pointer"
                >
                  <Img file="vizTg" />
                </a>
              </Vizitka>
            </div>
            <ColorImg file="color2" />
          </DressWrapper>
          <ConfirmTextImg file="confirm2" />
        </StyledStock>
        {guest && (
          <ConfirmBtnWrapper
            onClick={() => regRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="flex center"
          >
            <InStockImg
              file="confirmBtn1"
              className="pointer"
            />
          </ConfirmBtnWrapper>
        )}
        <SubFooter
          className="flex column"
          ref={regRef}
        >
          {guest && (
            <div className={isAnswerLoading ? ' disabled' : ''}>
              <div className="margin-big-gap-b">
                <div
                  className="pointer"
                  onClick={() => guest && setGuest({ ...guest, w: undefined })}
                >
                  <InStockImg
                    file="resolved"
                    className={guest.w !== WedGuestWillBe.Yes ? 'display-none' : undefined}
                  />
                  <InStockImg
                    file="rejected"
                    className={guest.w !== WedGuestWillBe.No ? 'display-none' : undefined}
                  />
                </div>

                <ConfButtonsWrapper className={guest.w != null ? 'display-none' : undefined}>
                  <InStockImg file="confButtons" />
                  <div
                    className="will pointer"
                    onClick={myAnswerSetter(guest, WedGuestWillBe.Yes, setGuest, setIsAnswerLoading)}
                  />
                  <div
                    className="no pointer"
                    onClick={myAnswerSetter(guest, WedGuestWillBe.No, setGuest, setIsAnswerLoading)}
                  />
                </ConfButtonsWrapper>
              </div>
              {guest && (
                <div className="relative over-auto">
                  {guest.w === WedGuestWillBe.Yes && guest.t && (
                    <CommentInfo className={'absolute' + (guest.w == null ? ' hidden' : '')}>
                      <h4>Информация о детях / комментарий:</h4>
                      <pre className="max-full-size">{guest.t}</pre>
                    </CommentInfo>
                  )}
                  <CommentInputWrapper className={guest.w == null ? undefined : 'hidden'}>
                    <FullWidthImg file="childrenWithMe" />
                    <CommentInput
                      value={guest.t}
                      onChange={event => {
                        setGuest({ ...guest, t: (event.currentTarget.value as never) || undefined });
                      }}
                    />
                  </CommentInputWrapper>
                </div>
              )}
            </div>
          )}
          <QrLink
            to="https://t.me/+PCD8QnnliEoyNzky"
            className="pointer"
          >
            <InStockImg file="qr1" />
          </QrLink>
        </SubFooter>

        <WithLoveImg
          file="withLove2"
          className="flex"
        />
      </StyledContent>
      {isLoading && (
        <div className="absolute flex center pos-all">
          <LogoImg file="DO" />
        </div>
      )}
    </>
  );
}

const StyledImg = styled.img``;

const Img = (props: { file: string } & HTMLAttributes<HTMLOrSVGElement>) => (
  <StyledImg
    {...props}
    src={`/resources/${props.file}${props.file.includes('.') ? '' : '.png'}`}
  />
);

const angle = '4deg';
const contentWidths = css`
  width: calc(100vw - 90px);
  max-width: calc(var(--stock-max-width) - 110px);
`;

const stockWidths = css`
  margin: auto;
  width: 100vw;
  max-width: var(--stock-max-width);
`;

const InStockImg = styled(Img)`
  ${contentWidths}
`;

const StockImg = styled(Img)`
  ${stockWidths}
`;

const WithLoveImg = styled(StockImg)`
  margin-top: -45px;
`;

const ColorImg = styled(StockImg)`
  margin-bottom: -100px;
`;

const FullWidthImg = styled(Img)`
  width: 100%;
`;

const LogoImg = styled(Img)`
  width: 20vw;
  animation: fade-in 3s infinite;

  @keyframes fade-in {
    from {
      opacity: 0.5;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    to {
      opacity: 0.5;
    }
  }
`;

const DressWrapper = styled.div`
  margin-top: 50px;
`;

const Vizitka = styled.div`
  position: absolute;
  background-color: #cdb8a4;
  padding: clamp(10px, 7vw, 25px);
  border-radius: clamp(20px, 10vw, 30px);
  top: -30px;
  z-index: 2;

  ${contentWidths}

  .vizText {
    width: 100%;
  }

  .vizPhone {
    margin-top: 20px;
    text-align: center;

    img {
      width: 51%;
    }
  }

  .vizTg {
    text-align: center;

    img {
      width: 33.7%;
    }
  }
`;

const CommentInput = styled.textarea`
  height: 120px;
  resize: none;
  font-family: cormorant;
  font-size: 1.3em;
  width: 100%;
`;

const CommentInfo = styled.div`
  font-family: cormorant;

  * {
    font-family: cormorant;
  }
`;

const CommentInputWrapper = styled.div`
  position: relative;
  font-family: cormorant;
  padding: 20px 50px 20px;
  background-color: #fff;
  border-radius: clamp(20px, 10vw, 50px);

  ${contentWidths}
`;

const ConfButtonsWrapper = styled.div`
  position: relative;

  ${contentWidths}

  .will, .no {
    position: absolute;
    top: 0;
    width: 49%;
    height: 80%;
  }

  .will {
    left: 0;
  }

  .no {
    right: 0;
  }
`;

const SubFooter = styled.div`
  position: relative;
  border-radius: clamp(40px, 6vw, 53px);
  padding-top: 120px;
  background-color: #eaddcd;
  margin-bottom: -100px;
  z-index: 2;

  ${stockWidths}
`;

const NameText = styled.div`
  font-size: clamp(12px, 7vw, 40px);
  text-align: center;
  margin-bottom: 20px;
  font-family: calypso;
`;

const ConfirmBtnWrapper = styled.a`
  padding: 10px;
  position: sticky;
  bottom: 0;
  width: 100%;
  margin-bottom: -100px;
  z-index: 3;
`;

const ConfirmTextImg = styled(InStockImg)`
  margin-top: 60px;
  margin-bottom: 70px;
`;

const QrLink = styled(Link)`
  margin-top: 60px;
  margin-bottom: 30px;
`;

const RotBoxContent = styled.div`
  rotate: ${angle};

  > :not(.address) {
    display: block;
    margin-left: auto;
    margin-right: auto;
    ${contentWidths}
  }
`;

const WeddingLine = styled.div`
  position: relative;
  bottom: -40px;
  color: #b7b3ad;
  font-family: cormorant;
  font-size: 0.8em;
  padding-left: 100px;

  > * {
    margin-left: 1em;
  }
`;

const RotBox = styled.div`
  background-color: #eaddcd;
  padding: 60px;
  rotate: -${angle};
  width: 200%;
  margin-top: clamp(-312px, -66vw, 0px);
  margin-bottom: 80px;
`;

const MainImg = styled(Img)`
  margin-bottom: var(--size);
  width: 100%;
`;

const StyledStock = styled.div`
  ${stockWidths}
  overflow: hidden;
`;

const StyledContent = styled.div`
  --size: 30px;
  --stock-max-width: 500px;

  overflow-y: auto;
  height: 100dvh;
  width: 100vw;
  color: #000;
  font-family: cormorant;
  opacity: 1;
  transition: opacity 2s;

  animation: fadeIn 2s;

  @keyframes fadeIn {
    from {
      opacity: 0;
      height: 0%;
    }
    to {
      opacity: 1;
      height: 100%;
    }
  }

  &.loading {
    display: none;
    opacity: 0;
  }

  .display-none {
    display: none;
  }
`;
