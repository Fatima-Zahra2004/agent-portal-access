
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <img src="/marocpme-logo.png" alt="MarocPME" className="h-6 w-auto" />
            <span className="text-sm text-muted-foreground">
              © 2024 MarocPME. Tous droits réservés.
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Portail Agent v1.0</span>
            <span>•</span>
            <span>Support Technique</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
