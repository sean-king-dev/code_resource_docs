<?php
/**
 * PDFResourceLink
 *
 * @package pdfresource
 * @subpackage snippet
 *
 * @var modX $modx
 * @var string $input
 */

$output = '';

if ($input) {
    if ($input == $modx->resource->get('id')) {
        $resource = &$modx->resource;
    } else {
        $resource = $modx->getObject('modResource', $input);
    }
    if ($resource) {
        $pdfPath = $modx->getOption('pdfresource.pdf_url', null, $modx->getOption('assets_url') . 'pdf/');
        $aliasPath = $resource->get('parent') ? preg_replace('#(\.[^./]*)$#', '/', $modx->makeUrl($resource->get('parent'))) : '';
        $output = $pdfPath . $aliasPath . $resource->get('alias') . '.pdf';
    }
}

return $output;


// test
// PDFResourceLinkTest.php
use PHPUnit\Framework\TestCase;

class PDFResourceLinkTest extends TestCase
{
    protected $modx;

    protected function setUp(): void
    {
        $this->modx = $this->createMock(modX::class);
    }

    public function testReturnsEmptyStringWhenInputIsEmpty()
    {
        $input = '';
        $output = $this->callSnippet($input);
        $this->assertEquals('', $output);
    }

    public function testReturnsPdfLinkForCurrentResource()
    {
        $input = $this->modx->resource->get('id');
        $this->modx->resource = $this->createMock(modResource::class);
        $this->modx->resource->method('get')->willReturn('test-resource-id');
        
        $pdfUrl = 'http://example.com/assets/pdf/';
        $this->modx->method('getOption')->willReturn($pdfUrl);

        // Mocking the makeUrl and parent properties
        $this->modx->resource->method('get')->with('parent')->willReturn(1);
        $this->modx->method('makeUrl')->willReturn('parent-resource');

        $this->modx->resource->method('get')->with('alias')->willReturn('test');

        $output = $this->callSnippet($input);
        $this->assertEquals($pdfUrl . 'parent-resource/test.pdf', $output);
    }

    public function testReturnsPdfLinkForDifferentResource()
    {
        $input = '123'; // Different resource ID
        $resourceMock = $this->createMock(modResource::class);
        $resourceMock->method('get')->willReturn('test-alias');
        $resourceMock->method('get')->with('parent')->willReturn(2);
        
        $this->modx->method('getObject')->willReturn($resourceMock);

        $pdfUrl = 'http://example.com/assets/pdf/';
        $this->modx->method('getOption')->willReturn($pdfUrl);

        // Mocking makeUrl for parent
        $this->modx->method('makeUrl')->willReturn('parent-resource');

        $output = $this->callSnippet($input);
        $this->assertEquals($pdfUrl . 'parent-resource/test-alias.pdf', $output);
    }

    public function testReturnsEmptyStringForNonexistentResource()
    {
        $input = '999'; // Nonexistent resource ID
        $this->modx->method('getObject')->willReturn(null); // No resource found

        $output = $this->callSnippet($input);
        $this->assertEquals('', $output);
    }

    protected function callSnippet($input)
    {
        // Assuming the snippet is defined in a function called PDFResourceLink
        // You can call it directly, or you can include it as a file and call it
        return (function() use ($input) {
            global $modx;
            $output = '';

            if ($input) {
                if ($input == $modx->resource->get('id')) {
                    $resource = &$modx->resource;
                } else {
                    $resource = $modx->getObject('modResource', $input);
                }
                if ($resource) {
                    $pdfPath = $modx->getOption('pdfresource.pdf_url', null, $modx->getOption('assets_url') . 'pdf/');
                    $aliasPath = $resource->get('parent') ? preg_replace('#(\.[^./]*)$#', '/', $modx->makeUrl($resource->get('parent'))) : '';
                    $output = $pdfPath . $aliasPath . $resource->get('alias') . '.pdf';
                }
            }

            return $output;
        })();
    }
}
