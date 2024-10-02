<?php

// Define paths
$mainCssPath = '../main.css';
$partialsFolderPath = '../partials/';
$compiledFilePath = '../compiled/main.min.css';
$sourceMapFilePath = '../compiled/main.min.css.map';

// Array to store partial file names
$partialFiles = [
    'accreditationFooter.css',
    'location_title_bg_col.css',
    'font_size.css',
    'factfile-row-accent.css',
    'normalize.css',
    'base.css',
    'kings_life_italy.css',
    'navbar.css',
    'footer.css',
    'megaMenuModal.css',
    'imgCircles.css',
    'defaultCarouselStyles.css',
    'carousel.css',
    
];

// Initialize content variable with the main CSS file content
$compiledContent = @file_get_contents($mainCssPath);

// Error handling for main CSS file
if ($compiledContent === false) {
    die("Error: Unable to load main CSS file.");
}

// Load and concatenate partial file contents
$partialContents = array_map(function ($partialFile) use ($partialsFolderPath) {
    $partialFilePath = $partialsFolderPath . '/' . $partialFile;
    $content = @file_get_contents($partialFilePath);

    // Error handling for partial files
    if ($content === false) {
        die("Error: Unable to load partial file: $partialFilePath");
    }

    return $content;
}, $partialFiles);

// Append content of each partial file to the main CSS content
$compiledContent .= PHP_EOL . implode(PHP_EOL, $partialContents);

// Minify the CSS content
$minifiedCss = minifyCss($compiledContent);

// Generate a simple source map
$sourceMap = generateSourceMap($compiledFilePath, $partialFiles);

// Save the compiled and minified content to the new file
if (@file_put_contents($compiledFilePath, $minifiedCss) === false) {
    die("Error: Unable to save compiled file.");
}

// Save the source map to a separate file
if (@file_put_contents($sourceMapFilePath, json_encode($sourceMap)) === false) {
    die("Error: Unable to save source map file.");
}

echo "Compilation and Minification completed. Output file: $compiledFilePath\n";
echo "Source map generated. Output file: $sourceMapFilePath\n";

/**
 * Minify CSS content using a simple approach
 *
 * @param string $cssContent
 * @return string
 */
function minifyCss($cssContent)
{
    // Remove comments
    $cssContent = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $cssContent);

    // Remove whitespace
    $cssContent = str_replace(["\r\n", "\r", "\n", "\t", '  ', '    ', '    '], '', $cssContent);

    return $cssContent;
}

/**
 * Generate a simple source map
 *
 * @param string $compiledFilePath
 * @param array $partialFiles
 * @return array
 */
function generateSourceMap($compiledFilePath, $partialFiles)
{
    $sourceMap = [
        'version' => 3,
        'file' => basename($compiledFilePath),
        'sources' => array_map(function ($partialFile) {
            return '../partials/' . $partialFile;
        }, $partialFiles),
        'names' => [],
        'mappings' => '',
    ];

    return $sourceMap;
}
?>




<?php

// test
// CssCompilerTest.php
use PHPUnit\Framework\TestCase;

class CssCompilerTest extends TestCase
{
    protected function setUp(): void
    {
        // Create a mock for file system functions
        $this->partialFiles = [
            'accreditationFooter.css',
            'location_title_bg_col.css',
            // Add other partial files as needed
        ];
        
        // Create temporary paths for testing
        $this->mainCssPath = '../main.css';
        $this->partialsFolderPath = '../partials/';
        $this->compiledFilePath = '../compiled/main.min.css';
        $this->sourceMapFilePath = '../compiled/main.min.css.map';
    }

    public function testLoadMainCssFile()
    {
        // Mock the main CSS file
        $this->assertFileExists($this->mainCssPath);
        $mainCssContent = file_get_contents($this->mainCssPath);
        $this->assertNotFalse($mainCssContent, "Error: Unable to load main CSS file.");
    }

    public function testLoadPartialCssFiles()
    {
        foreach ($this->partialFiles as $partialFile) {
            $partialFilePath = $this->partialsFolderPath . $partialFile;
            $this->assertFileExists($partialFilePath);
            $partialContent = file_get_contents($partialFilePath);
            $this->assertNotFalse($partialContent, "Error: Unable to load partial file: $partialFilePath");
        }
    }

    public function testMinifyCss()
    {
        $cssContent = "body { color: red; } /* comment */ \n";
        $minifiedCss = minifyCss($cssContent);
        $this->assertEquals("body{color:red;}", $minifiedCss);
    }

    public function testGenerateSourceMap()
    {
        $sourceMap = generateSourceMap($this->compiledFilePath, $this->partialFiles);
        $this->assertArrayHasKey('version', $sourceMap);
        $this->assertEquals(3, $sourceMap['version']);
        $this->assertCount(count($this->partialFiles), $sourceMap['sources']);
    }

    public function testFileWrite()
    {
        // Here you would mock file_put_contents and assert it's called with the correct arguments
        // For demonstration purposes, we're not writing actual files in this test
        $this->assertTrue(true); // Replace with actual logic when mocking is set up
    }
}

