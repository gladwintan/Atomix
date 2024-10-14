import { View, Text } from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'

const CourseLoader = () => {
  return (
    <View>
      <ContentLoader 
        speed={2}
        width={350}
        height={800}
        viewBox="0 0 350 800"
        backgroundColor="#f4f8ff"
        foregroundColor="#e9f0ff"
      >
        <Rect x="20" y="0" rx="10" ry="10" width="80" height="20" /> 
        <Rect x="290" y="5" rx="7" ry="7" width="60" height="15" /> 
        <Rect x="20" y="40" rx="10" ry="10" width="250" height="100" /> 
        
        <Rect x="20" y="190" rx="10" ry="10" width="80" height="20" /> 
        <Rect x="290" y="195" rx="7" ry="7" width="60" height="15" /> 
        <Rect x="20" y="230" rx="10" ry="10" width="120" height="120" />
        <Rect x="150" y="230" rx="10" ry="10" width="120" height="120" />
        
        <Rect x="20" y="400" rx="10" ry="10" width="80" height="20" /> 
        <Rect x="290" y="405" rx="7" ry="7" width="60" height="15" />
        <Rect x="20" y="440" rx="10" ry="10" width="330" height="80" />
        <Rect x="20" y="530" rx="10" ry="10" width="330" height="80" />
        <Rect x="20" y="620" rx="10" ry="10" width="330" height="80" />
        <Rect x="20" y="710" rx="10" ry="10" width="330" height="80" />
      </ContentLoader>
    </View>
  )
}

export default CourseLoader