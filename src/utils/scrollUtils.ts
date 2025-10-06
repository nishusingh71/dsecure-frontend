export const scrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

export const createSectionLink = (sectionId: string, basePath: string = '') => {
  return `${basePath}#${sectionId}`
}

// Hook to handle hash navigation
export const useHashNavigation = () => {
  const navigateToHash = (hash: string, offset: number = 80) => {
    // Remove # from hash if present
    const sectionId = hash.replace('#', '')
    
    setTimeout(() => {
      scrollToSection(sectionId, offset)
    }, 100) // Small delay to ensure page is loaded
  }

  return { navigateToHash }
}