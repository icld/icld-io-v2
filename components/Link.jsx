// Custom Link Component that does not require an <a> tag
import NextLink from 'next/link';

export const Link = ({ href, children, ...props }) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};
