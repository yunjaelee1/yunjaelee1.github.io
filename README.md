# Yunjae Lee — Personal Research Website

GitHub 계정: `yunjaelee1`
저장소 이름: `yunjaelee1.github.io`
공개 후 홈페이지 주소: https://yunjaelee1.github.io/

현재 홈페이지의 최신 내용을 GitHub Pages에 올릴 수 있도록 준비한 정적 사이트입니다. 별도 설치나 빌드가 필요하지 않습니다.

## 처음 공개하기

1. https://github.com/new 에서 새 저장소를 만듭니다.
2. Repository name을 정확히 `yunjaelee1.github.io`로 입력하고 **Public**을 선택합니다.
3. 이 ZIP 파일의 압축을 풉니다. ZIP 자체가 아니라 **압축을 푼 폴더 안의 파일들과 `assets` 폴더**를 업로드합니다.
4. 저장소의 **Add file → Upload files**를 선택합니다. 빈 저장소라면 **uploading an existing file** 링크를 사용할 수 있습니다.
5. 파일을 올리고 **Commit changes**를 누릅니다. 저장소 최상위에 `index.html`과 `assets/`가 나란히 보여야 합니다. 이들을 감싸는 폴더나 `dist` 폴더를 추가하지 마세요.
6. **Settings → Pages**로 이동합니다.
7. **Source: Deploy from a branch**, **Branch: main**, **Folder: /(root)**를 선택하고 **Save**를 누릅니다. 기본 브랜치 이름이 다르면 실제 파일을 올린 브랜치를 선택하세요.
8. 배포가 완료되면 https://yunjaelee1.github.io/ 를 엽니다. 변경 사항이 보이기까지 최대 약 10분이 걸릴 수 있습니다.

`.nojekyll` 파일도 함께 올리면 됩니다. 이 파일은 별도 Jekyll 빌드 없이 정적 파일을 배포하도록 표시합니다.

## 공개 후 확인

- 로그아웃 상태 또는 시크릿 창에서 홈페이지가 열리는지 확인합니다.
- Research & Projects의 여섯 프로젝트와 돌아가기 링크를 확인합니다.
- 프로젝트 이미지 확대, 사진 갤러리, CV 링크를 확인합니다.
- 휴대전화에서도 페이지를 확인합니다.

## 이후 수정하기

- 이 저장소의 파일을 수정하고 커밋하면 GitHub Pages가 다시 배포합니다.
- ChatGPT에 있는 사이트와 이 저장소는 자동으로 동기화되지 않습니다. 여기서 홈페이지를 수정한 경우, 새 파일도 GitHub 저장소에 반영해야 합니다.
- 콘텐츠는 `index.html`의 상세 보기 템플릿과 각 프로젝트의 개별 HTML 페이지에 함께 들어 있습니다. 관련 내용을 수정할 때 두 버전을 함께 갱신하세요. 프로젝트 목록은 `profile.html`에도 있습니다.
- CV는 `assets/Yunjae_Lee_CV.pdf`를 같은 이름의 최신 파일로 교체하면 됩니다.

## 포함한 파일

- `index.html`: 메인 화면과 상세 보기 템플릿
- `profile.html`: 전체 프로필 및 프로젝트 목록
- `dvs.html`, `pll.html`, `amplifier.html`, `absorber.html`, `fpga-clock.html`, `monitor.html`: 프로젝트별 페이지
- CSS/JavaScript 및 `assets/`: 기존 디자인, 상호작용, 사진, 구성도, CV
- `robots.txt`, `sitemap.xml`: 검색용 공개 주소
- `.nojekyll`: 정적 파일 배포 표시

사이트 주소와 공유 미리보기 이미지 주소는 `https://yunjaelee1.github.io`에 맞춰져 있습니다. 서버 설정, 계정 인증 정보, 원본 과제 ZIP 파일은 포함하지 않았습니다.

GitHub 공식 안내:
- https://docs.github.com/en/pages/quickstart
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
