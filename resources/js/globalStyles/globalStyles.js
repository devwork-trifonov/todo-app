import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
:root {
  --fs-base: 12px;
  --indent-base: 0.166rem;
  --fs-x-small: 0.69rem;
  --fs-small: 1.1rem;
  --fs-medium: 1.25rem;
  --fs-lg: 1.5rem;
  --fs-x-lg: 1.83rem;
  --fs-xx-lg: 2.33rem;
  --fs-larger: 3.66rem;
  --p-xx-s: var(--indent-base);
  --p-x-s: calc( var(--indent-base) * 2 );
  --p-s: calc( var(--indent-base) * 3 );
  --p-m: calc( var(--indent-base) * 4 );
  --p-lg: calc( var(--indent-base) * 5 );
  --p-x-lg: calc( var(--indent-base) * 10 );
  --m-xx-s: var(--indent-base);
  --m-x-s: calc( var(--indent-base) * 2 );
  --m-s: calc( var(--indent-base) * 3 );
  --m-m: calc( var(--indent-base) * 4 );
  --m-lg: calc( var(--indent-base) * 5 );
  --m-x-lg: calc( var(--indent-base) * 10 );
  --category-nav-width: 170px;
  --static-nav-height: 114px;
  --nav-logo-width: 180px;
  @media ( max-width: 556px ){
    --nav-logo-width: 115px;
  }
  @media ( max-width: 767px ) {
    --nav-logo-width: 130px;
    --fs-base: 10px;
    --category-nav-width: 120px;
  }
  @media ( min-width: 768px ) and ( max-width: 991px ) {
    --nav-logo-width: 130px;
    --fs-base: 10px;
    --category-nav-width: 150px;
  }
`
