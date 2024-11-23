import { ThemeContext } from '@/providers/colors/GlobalColors';
import React, { useContext } from 'react'

function ContentHeader({title}) {
    const { colors, typography } = useContext(ThemeContext);

  return (
    <h2 className="rounded-md text-white text-center text-2xl font-bold border-b-2 p-2" style={{backgroundColor: colors.mo_primary}}>
    {title}
  </h2>
  )
}

export default ContentHeader