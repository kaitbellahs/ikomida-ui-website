<section class="sectionWithShapeDivider">
  <div class="sectionInnerWrap">
    <div id="shapeDivider1" class="shapeDividerContainer">
      <div class="shapeDivider" style="transform:  scaleX(-1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          ><path
            fill="currentColor"
            fill-opacity="1"
            d="M0,224L48,240C96,256,192,288,288,256C384,224,480,128,576,80C672,32,768,32,864,69.3C960,107,1056,181,1152,176C1248,171,1344,85,1392,42.7L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          /></svg
        >
      </div>
    </div>

    <div id="shapeDivider2" class="shapeDividerContainer">
      <div class="shapeDivider">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          ><path
            fill="currentColor"
            fill-opacity="1"
            d="M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,122.7C672,117,768,75,864,96C960,117,1056,203,1152,229.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          /></svg
        >
      </div>
    </div>

    <div id="shapeDivider3" class="shapeDividerContainer">
      <div class="shapeDivider" style="transform:  scaleX(-1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          ><path
            fill="currentColor"
            fill-opacity="1"
            d="M0,96L30,106.7C60,117,120,139,180,133.3C240,128,300,96,360,80C420,64,480,64,540,101.3C600,139,660,213,720,240C780,267,840,245,900,245.3C960,245,1020,267,1080,250.7C1140,235,1200,181,1260,176C1320,171,1380,213,1410,234.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          /></svg
        >
      </div>
    </div>
  </div>
</section>

<style>
  .sectionWithShapeDivider {
    display: block;
    position: relative !important;
    width: 100%;
    background-size: cover;
    background-repeat: repeat;
    background-image: linear-gradient(90deg, #000000, #350101);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-position: 0% 50%;
    overflow: hidden;
  }

  .sectionWithShapeDivider > .sectionInnerWrap {
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    padding-top: 75px;
    max-width: 100%;
    padding-right: 20px;
    padding-bottom: 102px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .shapeDividerContainer {
    width: 0;
    height: 0;
  }
  #shapeDivider1 .shapeDivider {
    /* color: #ffffff24; */
    color: #ffc03ed6;
  }
  #shapeDivider2 .shapeDivider {
    /* color: rgba(255, 255, 255, 0.75); */
    /* color: rgb(101 82 82 / 75%); */
    color: #e7d146cc;
  }

  .shapeDivider {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    pointer-events: none;
  }
  #shapeDivider3 .shapeDivider {
    /* color: rgba(255, 255, 255, 0.25); */
    color: #fff; /*rgb(11 21 5 / 78%);*/
  }
  svg:not(:root) {
    overflow: hidden;
  }
  .shapeDivider > svg {
    min-width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    transform-origin: bottom center;
    width: 100%;
  }
  #shapeDivider1 .shapeDivider svg {
    height: 90px;
    width: 142%;
    left: -128px;
  }
  #shapeDivider2 .shapeDivider svg {
    height: 120px;
    width: 107%;
  }
  #shapeDivider3 .shapeDivider svg {
    height: 70px;
  }

  @media screen and (max-width: 820px) {
    #shapeDivider1 .shapeDivider svg {
      height: 70px;
    }
    #shapeDivider2 .shapeDivider svg {
      height: 80px;
    }
    #shapeDivider3 .shapeDivider svg {
      height: 60px;
    }
  }
</style>
